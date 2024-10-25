"use client"

import { Button } from "@/components/ui/button"
import { DataTable } from "@/components/ui/data-table"
import { ColumnDef } from "@tanstack/react-table"
import { CheckIcon, EditIcon, XIcon } from "lucide-react"
import Link from "next/link"

export type OrderColumn = {
  id: string
  isPaid: boolean
  number: string
  createdAt: string
}

interface OrderTableProps {
  data: OrderColumn[]
}

export const OrderTable: React.FC<OrderTableProps> = ({ data }) => {
  return <DataTable searchKey="products" columns={OrderColumn} data={data} />
}

export const OrderColumn: ColumnDef<OrderColumn>[] = [
  {
    accessorKey: "number",
    header: "Order Number",
  },
  {
    accessorKey: "date",
    header: "Date",
  },

  {
    accessorKey: "isPaid",
    header: "Paid",
    cell: (props) => (props.cell.getValue() ? <CheckIcon /> : <XIcon />),
  },
  {
    id: "actions",
    cell: ({ row }) => (
      <Link href={`/orders/${row.original.id}`}>
        <Button size="icon" variant="outline">
          <EditIcon className="h-4" />
        </Button>
      </Link>
    ),
  },
]
