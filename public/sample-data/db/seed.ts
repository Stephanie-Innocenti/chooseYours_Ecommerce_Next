
import 'dotenv/config'; 
import sampleData from "./sample-data";
import { PrismaClient } from "../../../prisma/generated/client/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);

const prisma = new PrismaClient({ adapter });
async function main() {
  try {
    await prisma.product.deleteMany();
    await prisma.account.deleteMany();
    await prisma.verificationToken.deleteMany();
    await prisma.session.deleteMany();
    await prisma.user.deleteMany();
    await prisma.product.createMany({
      data: sampleData.products,
    });
    await prisma.user.createMany({
      data: sampleData.users,
    });

    console.log("Dati inseriti con successo!");
  } catch (error) {
    console.error("Errore durante il seeding:", error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();
