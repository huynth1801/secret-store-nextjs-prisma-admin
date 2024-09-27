import prisma from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const userId = req.headers.get("X-USER-ID")

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const {
      title,
      price,
      discount,
      images,
      stock,
      categoryId,
      isFeatured,
      isAvailable,
    } = await req.json()

    const category = await prisma.category.findFirst({
      where: {
        id: categoryId,
      },
    })

    console.log(category)

    const product = await prisma.product.create({
      data: {
        title,
        price,
        discount,
        stock,
        isFeatured,
        isAvailable,
        images,
        categories: {
          connect: {
            id: categoryId,
          },
        },
      },
    })

    return NextResponse.json(product)
  } catch (error) {
    console.error("[PRODUCTS_POST]", error)
    return new NextResponse("Internal error", { status: 500 })
  }
}

export async function GET(req: Request) {
  try {
    const userId = req.headers.get("X-USER-ID")

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const { searchParams } = new URL(req.url)
    const categoryId = searchParams.get("categoryId") || undefined
    const isFeatured = searchParams.get("isFeatured")

    const products = await prisma.product.findMany()

    return NextResponse.json(products)
  } catch (error) {
    console.error("[PRODUCTS_GET]", error)
    return new NextResponse("Internal error", { status: 500 })
  }
}
