"use client"

import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, CheckIcon, EditIcon } from "lucide-react"
import CellAction from "./cell-action"
import { Button } from "@/components/ui/button"

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
    header: ({ column }) => {
      return (
        <Button
          variant={"ghost"}
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Price
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    enableSorting: true,
    sortingFn: (rowA, rowB) => {
      const priceA = parseFloat(rowA.original.price) || 0
      const priceB = parseFloat(rowB.original.price) || 0
      return priceA - priceB // Compare numeric values
    },
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
