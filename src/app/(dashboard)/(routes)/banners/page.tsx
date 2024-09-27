import prisma from "@/lib/prisma"
import { BannersColumn } from "./components/columns"
import { BannersClient } from "./components/client"
import { format } from "date-fns"

export default async function BannerPage() {
  const banners = await prisma.banner.findMany({
    orderBy: {
      createdAt: "desc",
    },
  })

  const formattedBanners: BannersColumn[] = banners.map((item) => ({
    id: item.id,
    label: item.label,
    createdAt: format(item.createdAt, "MMMM do, yyyy"),
  }))

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <BannersClient data={formattedBanners} />
      </div>
    </div>
  )
}
