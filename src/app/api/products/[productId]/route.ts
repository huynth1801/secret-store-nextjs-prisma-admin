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

    // Ensure the product belongs to the user
    const product = await prisma.product.findUnique({
      where: { id: params.productId },
    })

    if (!product) {
      return new NextResponse("Product not found", { status: 404 })
    }

    // Delete the product
    await prisma.product.delete({
      where: { id: params.productId },
    })

    return new NextResponse("Product deleted successfully", { status: 200 })
  } catch (error) {
    console.error("Error deleting product", error)
    return new NextResponse("Internal server error", { status: 500 })
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { productId: string } }
) {
  try {
    const userId = req.headers.get("X-USER-ID")

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    if (!params.productId) {
      return new NextResponse("Product Id is required", { status: 400 })
    }

    const product = await prisma.product.findUnique({
      where: { id: params.productId },
    })

    if (!product) {
      return new NextResponse("Product not found", { status: 404 })
    }

    const {
      title,
      images,
      price,
      discount,
      stock,
      categoryId,
      colors,
      isFeatured,
      description,
      isAvailable,
    } = await req.json()

    // Handle colors update

    const colorId = await prisma.color.findMany({
      where: {
        value: {
          in: colors,
        },
      },
    })

    console.log(colorId)

    const imageUrls = images.map((image: string | { url: string }) =>
      typeof image === "string" ? image : image.url
    )

    const updatedProduct = await prisma.product.update({
      where: { id: params.productId },
      data: {
        title,
        price,
        discount,
        stock,
        isFeatured,
        isAvailable,
        description,
        colors: {
          set: [],
          connect: colorId.map((color) => ({ id: color.id })),
        },
        categories: {
          set: [], // First disconnect all existing categories
          connect: categoryId ? [{ id: categoryId }] : [],
        },
        images: imageUrls,
      },
      include: {
        colors: true, // Include colors in the response
        categories: true, // Include categories in the response
      },
    })

    console.log(updatedProduct)

    return NextResponse.json(updatedProduct)
  } catch (error) {
    console.error("Error updating product", error)
    return new NextResponse("Internal server error", { status: 500 })
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
      return new NextResponse("Product Id is required", { status: 400 })
    }

    const product = await prisma.product.findUnique({
      where: { id: params.productId },
    })

    if (!product) {
      return new NextResponse("Product not found", { status: 404 })
    }

    return NextResponse.json(product)
  } catch (error) {
    console.error("Error retrieving product", error)
    return new NextResponse("Internal server error", { status: 500 })
  }
}
