"use client"

import { useRouter } from "next/navigation"
import { CategoryColumn, columns } from "./columns"
import { Heading } from "@/components/ui/heading"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { DataTable } from "@/components/ui/data-table"
import { Separator } from "@/components/ui/separator"

interface CategoryClientProps {
  data: CategoryColumn[]
}

export const CategoriesClient: React.FC<CategoryClientProps> = ({ data }) => {
  const router = useRouter()

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Category (${data.length})`}
          description="Manage category for your store"
        />
        <Button onClick={() => router.push("/category/new")}>
          <Plus className="h-4 w-4" /> Add New
        </Button>
      </div>
      <Separator />
      <DataTable searchKey="title" columns={columns} data={data} />
    </>
  )
}
