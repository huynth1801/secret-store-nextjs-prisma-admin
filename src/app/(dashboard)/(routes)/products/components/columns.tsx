"use client"

import { ColumnDef } from "@tanstack/react-table"
import { CheckIcon, EditIcon } from "lucide-react"
import CellAction from "./cell-action"

export type ProductColumn = {
  id: string
  title: string
  price: string
  discount: string
  color?: string
  category: string
  isAvailable: boolean
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
  // {
  //   accessorKey: "sales",
  //   header: "Sale",
  // },
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
