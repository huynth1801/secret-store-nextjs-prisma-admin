"use client"

import { useRouter } from "next/navigation"
import { BannersColumn, columns } from "./columns"
import { Heading } from "@/components/ui/heading"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { DataTable } from "@/components/ui/data-table"
import { Separator } from "@/components/ui/separator"

interface BannersClientProps {
  data: BannersColumn[]
}

export const BannersClient: React.FC<BannersClientProps> = ({ data }) => {
  const router = useRouter()

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Banners (${data.length})`}
          description="Manage banners for your store"
        />
        <Button onClick={() => router.push("/banners/new")}>
          <Plus className="h-4 w-4" /> Add New
        </Button>
      </div>
      <Separator />
      <DataTable searchKey="label" columns={columns} data={data} />
    </>
  )
}
