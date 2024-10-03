import prisma from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const userId = req.headers.get("X-USER-ID")

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 401 })
    }

    const body = await req.json()

    const { name, value } = body

    if (!name) {
      return new NextResponse("Name is required", { status: 400 })
    }

    if (!value) {
      return new NextResponse("Value is required", { status: 400 })
    }

    const color = await prisma.color.create({
      data: {
        name,
        value,
      },
    })

    return NextResponse.json(color)
  } catch (error) {
    console.error("[COLORS_POST]", error)
    return new NextResponse("Internal error", { status: 500 })
  }
}
