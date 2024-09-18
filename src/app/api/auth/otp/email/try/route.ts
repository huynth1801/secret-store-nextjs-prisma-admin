import prisma from "@/lib/prisma"
import { ZodError } from "zod"
import { NextRequest, NextResponse } from "next/server"
import { getErrorResponse, isEmailValidCustom } from "@/lib/utils"
import { generateSerial } from "@/lib/serial"
import { sendOTPEmail } from "@/lib/email-sender"

export async function POST(req: NextRequest) {
  try {
    const OTP = generateSerial({})

    const { email } = await req.json()

    if (isEmailValidCustom(email)) {
      await prisma.owner.update({
        where: { email },
        data: {
          OTP,
        },
      })

      await sendOTPEmail({
        to: email,
        subject: "Your OTP for authentication",
        otp: OTP,
      })
      return new NextResponse(
        JSON.stringify({
          status: "success",
          email,
        }),
        {
          status: 200,
          headers: { "Content-Type": "application/json" },
        }
      )
    }
    if (!isEmailValidCustom(email)) {
      return getErrorResponse(400, "Incorrect Email")
    }
  } catch (error) {
    console.error(error)
    if (error instanceof ZodError) {
      return getErrorResponse(400, "failed validations", error)
    }
  }
}
