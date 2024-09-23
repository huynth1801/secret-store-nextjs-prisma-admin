import prisma from "@/lib/prisma"
import React from "react"
import { BannerForm } from "./components/banner-form"

const BannerPage = async ({ params }: { params: { bannerId: string } }) => {
  const banners = await prisma.banner.findUnique({
    where: { id: params.bannerId },
  })
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <BannerForm initialData={banners} />
      </div>
    </div>
  )
}

export default BannerPage
