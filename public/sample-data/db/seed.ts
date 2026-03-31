/* eslint-disable @typescript-eslint/no-unused-vars */
import "dotenv/config";

import sampleData from "./sample-data";
import { PrismaClient } from "../../../prisma/generated/client/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import { hash } from "@/lib/encrypt";
import { hashSync } from "bcrypt-ts-edge";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL!,
  ssl: { rejectUnauthorized: false },
});
const adapter = new PrismaPg(pool);

const prisma = new PrismaClient({ adapter });

// seed.ts

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
    const users = [];
    for (let i = 0; i < sampleData.users.length; i++) {
      users.push({
        ...sampleData.users[i],
        password: hashSync("123456", 10).toString(),
      });
    }
    await prisma.user.createMany({ data: users });

  } catch (error) {
    console.error("Errore durante il seeding:", error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();
