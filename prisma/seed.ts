import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  let createdProducts = [],
    createdProviders = [];

  const owners: string[] = ["huuhuy1801@gmail.com"];

  try {
    for (const owner of owners) {
      await prisma.owner.create({
        data: {
          email: owner,
        },
      });
    }
    console.log("Created owners");
  } catch (error) {
    console.error("Could not create owners...");
  }
}

try {
  main();
  prisma.$disconnect();
} catch (error) {
  console.error(error);
  process.exit(1);
}
