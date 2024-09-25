import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

async function main() {
  let createdProducts = [],
    createdProviders = []

  const owners: string[] = ["huuhuy1801@gmail.com"]

  const categories = ["Clothing", "Bikini", "Accessories", "Sleep", "Beauty"]

  const banners = [
    {
      image:
        "https://i.pinimg.com/originals/5f/3f/42/5f3f42860d346c4f4f216ac0cc285efc.png",
      label: "Explore my collection",
    },
  ]

  const products = [
    {
      title: "BKID Pipe",
      brand: "BKID",
      categories: ["Accessories"],
      keywords: ["pipe", "brushed", "wood"],
      price: 69.99,
      images: ["https://lemanoosh.com/app/uploads/bkid-pipe-01.jpg"],
    },
    {
      title: "Bang and Olufsen Speaker",
      brand: "Bang and Olufsen",
      categories: ["Electronics"],
      keywords: ["speaker", "brushed", "mechanical"],
      price: 9.99,
      images: [
        "https://lemanoosh.com/app/uploads/BO_2019_A1_Natural_Brushed_05-768x1156.jpg",
      ],
    },
    {
      title: "Audio Technica Turn-table",
      brand: "Audio Technica",

      categories: ["Electronics"],
      keywords: ["music", "brushed", "mechanical"],
      price: 12.99,
      images: [
        "https://lemanoosh.com/app/uploads/gerhardt-kellermann-zeitmagazin-10.jpg",
      ],
    },
    {
      title: "Monocle Sneakers",
      brand: "Monocle",

      categories: ["Electronics"],
      keywords: ["shoes", "brushed", "mechanical"],
      price: 1.99,
      images: [
        "https://lemanoosh.com/app/uploads/plp-women-footwear-sneakers-04-07-768x1246.jpg",
      ],
    },
    {
      title: "Zone2 Mens Watch",
      brand: "Zone2",

      categories: ["Electronics"],
      keywords: ["shoes", "brushed", "mechanical"],
      price: 129.99,
      images: ["https://lemanoosh.com/app/uploads/0055-768x1023.jpg"],
    },
    {
      title: "Carl Hauser L1 Phone",
      brand: "Carl Hauser",
      categories: ["Electronics"],
      keywords: ["shoes", "brushed", "mechanical"],
      price: 5.99,
      images: [
        "https://lemanoosh.com/app/uploads/carl-hauser-0121-768x993.jpg",
      ],
    },
    {
      title: "Carl Hauser Scanner",
      brand: "Carl Hauser",
      categories: ["Electronics"],
      keywords: ["shoes", "brushed", "mechanical"],
      price: 22.99,
      images: ["https://lemanoosh.com/app/uploads/carl-hauser-020-768x973.jpg"],
    },
    {
      title: "Bright Neon Helmet",
      brand: "Bright",
      categories: ["Electronics"],
      keywords: ["shoes", "brushed", "mechanical"],
      price: 17.99,
      images: ["https://lemanoosh.com/app/uploads/Orange_white-_Helmet_01.jpg"],
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

  try {
    for (const category of categories) {
      await prisma.category.create({
        data: {
          title: category,
        },
      })
    }
  } catch (error) {
    console.error("Could not create Categories...")
  }
}

//

try {
  main()
  prisma.$disconnect()
} catch (error) {
  console.error(error)
  process.exit(1)
}
