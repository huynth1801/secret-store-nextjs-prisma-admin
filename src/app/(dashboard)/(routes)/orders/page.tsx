import { Heading } from "@/components/ui/heading"
import { Separator } from "@/components/ui/separator"
import prisma from "@/lib/prisma"
import { Category } from "@prisma/client"
import {format} from 'date-fns'
import React from "react"

type OrdersPageProps = {
    userId: string
    isPaid: boolean
    category: Category
    page: number
}

const OrdersPage = ({ searchParams }) => {
  return <div>OrdersPage</div>
}

export default OrdersPage
