import prisma from "@/lib/prisma"
import { NextRequest, NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const userId = req.headers.get("X-USER-ID")
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const body = await req.json()

    const { title, bannerId } = body

    if (!title) {
      return new NextResponse("Title is required", { status: 400 })
    }

    if (!bannerId) {
      return new NextResponse("Banner id is required", { status: 400 })
    }

    const banner = await prisma.banner.findFirst({
      where: {
        id: bannerId,
      },
    })

    const category = await prisma.category.create({
      data: {
        title: title,
        description: banner?.label,
      },
    })

    return NextResponse.json(category)
  } catch (error) {
    console.error("Error when adding new category", error)
    return new NextResponse("Internal server", { status: 500 })
  }
}
