"use client"

import { Button } from "@/components/ui/button"
import { DataTable } from "@/components/ui/data-table"
import { ColumnDef } from "@tanstack/react-table"
import { EditIcon } from "lucide-react"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import { CellAction } from "./cell-action"

export type CategoryColumn = {
  id: string
  title: string
  products: number
}

export const columns: ColumnDef<CategoryColumn[]> = [
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "products",
    header: "Products",
  },
  {
    id: "actions",
    cell: {},
  },
]
