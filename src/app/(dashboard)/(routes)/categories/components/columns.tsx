"use client"

import { ColumnDef } from "@tanstack/react-table"
import { CellAction } from "./cell-action"
import { Button } from "@/components/ui/button"
import { ArrowUpDown } from "lucide-react"

export type CategoryColumn = {
  id: string
  title: string
  products: number
}

export const columns: ColumnDef<CategoryColumn>[] = [
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "products",
    header: ({ column }) => {
      return (
        <Button
          variant={"ghost"}
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Products
          <ArrowUpDown
            className={`ml-2 h-4 w-4 ${
              column.getIsSorted() === "asc" ? "rotate-180" : ""
            }`}
          />
        </Button>
      )
    },
    // Enable sorting on the "products" column
    enableSorting: true,
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
]
