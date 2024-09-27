import prisma from "@/lib/prisma"
import { CategoryColumn } from "./components/columns"
import { CategoriesClient } from "./components/client"

export default async function CategoryPage() {
  const categories = await prisma.category.findMany({
    include: {
      products: true,
    },
  })

  const formattedCategories: CategoryColumn[] = categories.map((category) => ({
    id: category.id,
    title: category.title,
    products: category.products.length,
  }))

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <CategoriesClient data={formattedCategories} />
      </div>
    </div>
  )
}
