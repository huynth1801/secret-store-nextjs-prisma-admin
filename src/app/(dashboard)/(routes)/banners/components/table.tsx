"use client"

import { DataTable } from "@/components/ui/data-table"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ColumnDef } from "@tanstack/react-table"
import Link from "next/link"
import { EditIcon } from "lucide-react"
import { CellAction } from "./cell-action"

export type BannersColumn = {
  id: string
  label: string
  createdAt: string
}

export const columns: ColumnDef<BannersColumn>[] = [
  {
    accessorKey: "label",
    header: "Label",
  },
  {
    accessorKey: "createdAt",
    header: "Date",
  },
  {
    id: "actions",
    cell: ({ row }) => (
      // <Link href={`/banners/${row.original.id}`}>
      //   <Button size={"icon"} variant={"outline"}>
      //     <EditIcon className="h-4" />
      //   </Button>
      // </Link>
      <CellAction data={row.original} />
    ),
  },
]

interface BannersClientProps {
  data: BannersColumn[]
}

export const BannersClient: React.FC<BannersClientProps> = ({ data }) => {
  const params = useParams()
  const router = useRouter()

  return <DataTable searchKey="label" columns={columns} data={data} />
}
