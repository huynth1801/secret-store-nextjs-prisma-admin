import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

async function main() {
  let createdProducts = [],
    createdProviders = []

  const owners: string[] = ["huuhuy1801@gmail.com"]

  const banners = [
    {
      image:
        "https://i.pinimg.com/originals/5f/3f/42/5f3f42860d346c4f4f216ac0cc285efc.png",
      label: "Explore my collection",
    },
  ]

  try {
    for (const owner of owners) {
      await prisma.owner.create({
        data: {
          email: owner,
        },
      })
    }
    console.log("Created owners")
  } catch (error) {
    console.error("Could not create owners...")
  }

  try {
    for (const banner of banners) {
      await prisma.banner.create({
        data: {
          image: banner.image,
          label: banner.label,
        },
      })
    }
    console.log("Created owners")
  } catch (error) {
    console.error("Could not create owners...")
  }
}

try {
  main()
  prisma.$disconnect()
} catch (error) {
  console.error(error)
  process.exit(1)
}
