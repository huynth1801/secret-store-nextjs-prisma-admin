"use client"

import { Button } from "@/components/ui/button"
import { DataTable } from "@/components/ui/data-table"
import { ColumnDef } from "@tanstack/react-table"
import { CheckIcon, EditIcon, XIcon } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import CellAction from "./cell-action"

export type ProductColumn = {
  id: string
  title: string
  price: string
  discount: string
  color: string
  category: string
  sales: number
  isAvailable: boolean
}

interface ProductTableProps {
  data: ProductColumn[]
}

export const columns: ColumnDef<ProductColumn>[] = [
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "price",
    header: "Price",
  },
  {
    accessorKey: "discount",
    header: "Discount",
  },
  {
    accessorKey: "category",
    header: "Category",
  },
  {
    accessorKey: "sales",
    header: "Sale",
  },
  {
    accessorKey: "color",
    header: "Color",
    cell: ({ row }) => (
      <div className="flex items-center gap-x-2">
        {row.original.color}
        <div
          className="h-6 w-6 rounded-full border"
          style={{ backgroundColor: row.original.color }}
        />
      </div>
    ),
  },
  {
    accessorKey: "isAvailable",
    header: "Available",
    cell: (props) => (props.cell.getValue() ? <CheckIcon /> : <EditIcon />),
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
]

export const ProductsTable: React.FC<ProductTableProps> = ({ data }) => {
  return <DataTable searchKey="title" columns={columns} data={data} />
}
