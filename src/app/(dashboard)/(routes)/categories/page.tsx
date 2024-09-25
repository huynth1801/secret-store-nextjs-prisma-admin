import prisma from "@/lib/prisma"
import { CategoriesClient, CategoryColumn } from "./components/table"
import { Heading } from "@/components/ui/heading"
import Link from "next/link"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

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
    <div className="my-6 block space-y-4">
      <div className="flex items-center justify-between">
        <Heading
          title={`Categories (${categories.length})`}
          description="Manage categories for your store"
        />
        <Link href={"/categories/new"}>
          <Button>
            <Plus className="mr-2 h-4" /> Add New
          </Button>
        </Link>
      </div>
      <Separator />
      <CategoriesClient data={formattedCategories} />
    </div>
  )
}
