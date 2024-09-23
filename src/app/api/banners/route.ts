import prisma from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const body = await req.json()

    const { label, image } = body

    console.log(body)

    if (!label) {
      console.log("Label is missing")
      return new NextResponse("Label is required", { status: 400 })
    }

    if (!image) {
      console.log("Label is missing")
      return new NextResponse("Image url is required", { status: 400 })
    }

    const banner = await prisma.banner.create({
      data: {
        label,
        image,
      },
    })

    return NextResponse.json(banner)
  } catch (error) {
    console.error("[BANNERS_POST]", error)
    return new NextResponse("Internal error", { status: 500 })
  }
}
