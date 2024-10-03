import React from "react"
import { format } from "date-fns"
import { ColorsClient } from "./components/client"
import prisma from "@/lib/prisma"
import { ColorColumn } from "./components/column"

const ColorPage = async () => {
  const colors = await prisma.color.findMany({
    orderBy: {
      createdAt: "desc",
    },
  })

  const formattedColor: ColorColumn[] = colors.map((item) => ({
    id: item.id,
    name: item.name,
    value: item.value,
    createdAt: format(item.createdAt, "MMMM do, yyyy"),
  }))

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ColorsClient data={formattedColor} />
      </div>
    </div>
  )
}

export default ColorPage
