import { PrismaClient } from "@prisma/client"

function getRandomFloat(min: number, max: number, precision: number): number {
  if (min >= max || precision < 0) {
    throw new Error(
      "Invalid input: min should be less than max and precision should be non-negative."
    )
  }

  const range = max - min
  const randomValue = Math.random() * range + min

  return parseFloat(randomValue.toFixed(precision))
}

function getRandomIntInRange(min: number, max: number) {
  return Math.floor(Math.random() * (max - min) + min)
}

// function getRandomDate(start, end) {
//   return new Date(
//     start.getTime() + Math.random() * (end.getTime() - start.getTime())
//   )
// }

function getRandomBoolean() {
  return getRandomIntInRange(0, 2) == 0 ? false : true
}

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
      price: 400000,
      images: ["https://lemanoosh.com/app/uploads/bkid-pipe-01.jpg"],
    },
    {
      title: "Bang and Olufsen Speaker",
      brand: "Bang and Olufsen",
      categories: ["Clothing"],
      keywords: ["speaker", "brushed", "mechanical"],
      price: 400000,
      images: [
        "https://lemanoosh.com/app/uploads/BO_2019_A1_Natural_Brushed_05-768x1156.jpg",
      ],
    },
    {
      title: "Audio Technica Turn-table",
      brand: "Audio Technica",

      categories: ["Clothing"],
      keywords: ["music", "brushed", "mechanical"],
      price: 400000,
      images: [
        "https://lemanoosh.com/app/uploads/gerhardt-kellermann-zeitmagazin-10.jpg",
      ],
    },
    {
      title: "Monocle Sneakers",
      brand: "Monocle",

      categories: ["Clothing"],
      keywords: ["shoes", "brushed", "mechanical"],
      price: 300000,
      images: [
        "https://lemanoosh.com/app/uploads/plp-women-footwear-sneakers-04-07-768x1246.jpg",
      ],
    },
    {
      title: "Zone2 Mens Watch",
      brand: "Zone2",

      categories: ["Accessories"],
      keywords: ["shoes", "brushed", "mechanical"],
      price: 300000,
      images: ["https://lemanoosh.com/app/uploads/0055-768x1023.jpg"],
    },
    {
      title: "Carl Hauser L1 Phone",
      brand: "Carl Hauser",
      categories: ["Accessories"],
      keywords: ["shoes", "brushed", "mechanical"],
      price: 300000,
      images: [
        "https://lemanoosh.com/app/uploads/carl-hauser-0121-768x993.jpg",
      ],
    },
    {
      title: "Carl Hauser Scanner",
      brand: "Carl Hauser",
      categories: ["Accessories"],
      keywords: ["shoes", "brushed", "mechanical"],
      price: 300000,
      images: ["https://lemanoosh.com/app/uploads/carl-hauser-020-768x973.jpg"],
    },
    {
      title: "Bright Neon Helmet",
      brand: "Bright",
      categories: ["Accessories"],
      keywords: ["shoes", "brushed", "mechanical"],
      price: 300000,
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

  // try {
  //   for (const banner of banners) {
  //     await prisma.banner.create({
  //       data: {
  //         image: banner.image,
  //         label: banner.label,
  //       },
  //     })
  //   }
  //   console.log("Created banners")
  // } catch (error) {
  //   console.error("Could not create banners...")
  // }

  try {
    for (const category of categories) {
      await prisma.category.create({
        data: {
          title: category,
        },
      })
    }
    console.log("Created categories")
  } catch (error) {
    console.error("Could not create Categories...")
  }

  // Add product
  try {
    for (const product of products) {
      const createdProduct = await prisma.product.create({
        data: {
          isAvailable: getRandomBoolean(),
          title: product.title,
          price: getRandomFloat(20000, 200000, 2),
          stock: getRandomIntInRange(1, 100),
          discount: getRandomIntInRange(10, 50),
          description: "Description of this products.",
          images: product.images,
          keywords: product.keywords,
          categories: {
            connect: {
              title: product.categories[0],
            },
          },
        },
        include: {
          categories: true,
        },
      })
      console.log(createdProduct)
      createdProducts.push(createdProduct)
    }
    console.log("Created sample products")
  } catch (error) {
    console.error("Could not create product")
  }
}

try {
  main()
  prisma.$disconnect()
} catch (error) {
  console.error(error)
  process.exit(1)
}
