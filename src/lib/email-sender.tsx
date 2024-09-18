import nodemailer from "nodemailer"
import { render } from "@react-email/render"
import SMTPTransport from "nodemailer/lib/smtp-transport"
import { OTPEmail } from "@/emails/OTPemail"

// Config transporter
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: parseInt(process.env.EMAIL_PORT || "587"),
  secure: process.env.EMAIL_SECURE === "true", // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
})

interface EmailOptions {
  to: string
  subject: string
  otp: string
}

export async function sendOTPEmail({
  to,
  subject,
  otp,
}: EmailOptions): Promise<SMTPTransport.SentMessageInfo> {
  try {
    if (!otp) {
      throw new Error("OTP is required")
    }

    // Render the OTPEmail component to HTML
    const emailHtml = await render(<OTPEmail otp={otp} />)

    const info = await transporter.sendMail({
      from: process.env.EMAIL_FROM!,
      to,
      subject,
      html: emailHtml,
    })

    console.log("Message sent: %s", info.messageId)
    return info
  } catch (error) {
    console.error("Error sending email:", error)
    throw error
  }
}
