import React from "react"
import prisma from "@/lib/prisma"
import { formatter, percentageFormatter } from "@/lib/utils"
import { ProductColumn } from "./components/columns"
import { ProductClient } from "./components/client"

const ProductPage = async () => {
  const products = await prisma.product.findMany({
    include: {
      categories: true,
      colors: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  })

  const formattedProducts: ProductColumn[] = products.map((product) => ({
    id: product.id,
    title: product.title,
    price: formatter.format(product.price),
    discount: percentageFormatter.format(product.discount / 100),
    color: product.colors[0]?.value,
    category: product.categories[0].title,
    isAvailable: product.isAvailable,
  }))
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ProductClient data={formattedProducts} />
      </div>
    </div>
  )
}

export default ProductPage
