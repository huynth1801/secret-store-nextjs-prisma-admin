import { NextApiRequest, NextApiResponse } from "next"
import { sign, verify } from "jsonwebtoken"
import { hash, compare } from "bcrypt"

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key"

export const hashPassword = (password: string) => hash(password, 10)

export const comparePassword = (password: string, hashedPassword: string) =>
  compare(password, hashedPassword)

// Helper function to generate an access token
export function generateAccessToken(userId: string) {
  return sign({ userId }, process.env.JWT_SECRET!, { expiresIn: "15m" })
}

// Helper function to generate a refresh token
export function generateRefreshToken(userId: string) {
  return sign({ userId }, process.env.JWT_REFRESH_SECRET!, { expiresIn: "7d" })
}

export const verifyToken = (token: string, secret_key: string) => {
  try {
    return verify(token, secret_key) as { userId: string }
  } catch (error) {
    console.error("Error when verifying token", error)
    return null
  }
}

export const authenticated =
  (
    handler: (
      req: NextApiRequest,
      res: NextApiResponse,
      userId: string
    ) => Promise<void>
  ) =>
  async (req: NextApiRequest, res: NextApiResponse) => {
    const token = req.headers.authorization?.split(" ")[1]
    if (!token)
      return res.status(401).json({ message: "Authentication required" })

    const decoded = verifyToken(token, process.env.JWT_SECRET!)
    if (!decoded) return res.status(401).json({ message: "Invalid token" })

    return handler(req, res, decoded.userId)
  }
