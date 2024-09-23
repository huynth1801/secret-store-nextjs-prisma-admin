import prisma from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function DELETE(
  req: Request,
  { params }: { params: { bannerId: string } }
) {
  try {
    if (!params.bannerId) {
      return new NextResponse("Banner id is required", { status: 400 })
    }

    const banners = await prisma.banner.deleteMany({
      where: {
        id: params.bannerId,
      },
    })

    return NextResponse.json(banners)
  } catch (error) {
    console.error("[BILLBOARDS_DELETE]", error)
    return new NextResponse("Internal error", { status: 500 })
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { bannerId: string } }
) {
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

    if (!params.bannerId) {
      return new NextResponse("Banner id is required", { status: 400 })
    }

    const banner = await prisma.banner.updateMany({
      where: {
        id: params.bannerId,
      },
      data: {
        label,
        image,
      },
    })

    return NextResponse.json(banner)
  } catch (error) {
    console.error("[BANNERS_PATCH]", error)
    return new NextResponse("Internal error", { status: 500 })
  }
}
