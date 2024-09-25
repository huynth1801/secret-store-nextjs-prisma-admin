import prisma from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function DELETE(
  req: Request,
  { params }: { params: { categoryId: string } }
) {
  try {
    const userId = req.headers.get("X-USER-ID")

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    if (!params.categoryId) {
      return new NextResponse("Category id is required", { status: 400 })
    }

    const category = await prisma.category.delete({
      where: {
        id: params.categoryId,
      },
    })

    return NextResponse.json(category)
  } catch (error) {
    console.error("Error when deleting category", error)
    return new NextResponse("Internal server", { status: 500 })
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { categoryId: string } }
) {
  try {
    const userId = req.headers.get("X-USER-ID")

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const body = await req.json()

    const { title, bannerId } = body

    if (!bannerId) {
      return new NextResponse("Banner id is required", { status: 400 })
    }

    if (!title) {
      return new NextResponse("Title is required", { status: 400 })
    }

    if (!params.categoryId) {
      return new NextResponse("Category id is required", { status: 400 })
    }

    const bannner = await prisma.banner.findFirst({
      where: {
        id: bannerId,
      },
    })

    const category = await prisma.category.updateMany({
      where: {
        id: params.categoryId,
      },
      data: {
        title,
        description: bannner?.label,
      },
    })

    return NextResponse.json(category)
  } catch (error) {
    console.error("Error when updating category", error)
    return new NextResponse("Internal error", { status: 500 })
  }
}
