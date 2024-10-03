import prisma from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function DELETE(
  req: Request,
  { params }: { params: { productId: string } }
) {
  try {
    const userId = req.headers.get("X-USER-ID")

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const product = await prisma.product.delete({
      where: {
        id: params.productId,
      },
    })

    return NextResponse.json(product)
  } catch (error) {
    console.error("Error when deletting product", error)
    return new NextResponse("Internal server", { status: 500 })
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { productId: string } }
) {
  try {
    if (!params.productId) {
      return new NextResponse("Product Id is required", { status: 400 })
    }

    const userId = req.headers.get("X-USER-ID")

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const {
      title,
      images,
      price,
      discount,
      stock,
      categoryId,
      colorId,
      isFeatured,
      description,
      isAvailable,
    } = await req.json()

    const categories = await prisma.category.findMany({
      where: {
        id: categoryId,
      },
    })

    for (const category of categories) {
      await prisma.category.update({
        where: {
          id: category.id,
        },
        data: { title: category.title },
      })
    }

    const product = await prisma.product.update({
      where: {
        id: params.productId,
      },
      data: {
        title,
        price,
        discount,
        stock,
        isFeatured,
        colorId,
        isAvailable,
        description,
        categories: {
          connect: categories.map((cat) => ({ id: cat.id })),
        },
        images: [...images.map((image: { url: string }) => image)],
      },
    })

    return NextResponse.json(product)
  } catch (error) {
    console.error("[PRODUCT_PATCH]", error)
    return new NextResponse("Internal error", { status: 500 })
  }
}

export async function GET(
  req: Request,
  { params }: { params: { productId: string } }
) {
  try {
    const userId = req.headers.get("X-USER-ID")

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    if (!params.productId) {
      return new NextResponse("Product id is required", { status: 400 })
    }

    const product = await prisma.product.findUniqueOrThrow({
      where: {
        id: params.productId,
      },
    })

    return NextResponse.json(product)
  } catch (error) {
    console.error("Error when getting product", error)
    return new NextResponse("Internal error", { status: 500 })
  }
}
