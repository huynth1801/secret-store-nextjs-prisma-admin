import prisma from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function GET(
  req: Request,
  { params }: { params: { colorId: string } }
) {
  try {
    if (!params.colorId) {
      return new NextResponse("Color id is required", { status: 400 })
    }

    const color = await prisma.color.findUnique({
      where: {
        id: params.colorId,
      },
    })

    return NextResponse.json(color)
  } catch (error) {
    console.error("[COLOR_GET]", error)
    return new NextResponse("Internal server", { status: 500 })
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { colorId: string } }
) {
  try {
    const userId = req.headers.get("X-USER-ID")

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 401 })
    }

    const body = await req.json()

    const { name, value } = body

    if (!name) {
      return new NextResponse("Color name is required", { status: 400 })
    }

    if (!value) {
      return new NextResponse("Value is required", { status: 400 })
    }

    const updatedColor = await prisma.color.updateMany({
      where: {
        id: params.colorId,
      },
      data: {
        name,
        value,
      },
    })

    return NextResponse.json(updatedColor)
  } catch (error) {
    console.error("[COLOR_PATCH]", error)
    return new NextResponse("Internal server", { status: 500 })
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { colorId: string } }
) {
  try {
    const userId = req.headers.get("X-USER-ID")

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 401 })
    }

    if (!params.colorId) {
      return new NextResponse("Color id is required", { status: 400 })
    }

    const color = await prisma.color.deleteMany({
      where: {
        id: params.colorId,
      },
    })

    return NextResponse.json(color)
  } catch (error) {
    console.error("[DELETE_COLOR]", error)
    return new NextResponse("Internal server", { status: 500 })
  }
}
