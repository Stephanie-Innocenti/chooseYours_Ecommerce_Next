/*
  Warnings:

  - The `items` column on the `Cart` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Cart" DROP COLUMN "items",
ADD COLUMN     "items" JSONB NOT NULL DEFAULT '[]';

-- AlterTable
ALTER TABLE "Order" ALTER COLUMN "shippingAddress" SET DATA TYPE JSONB,
ALTER COLUMN "paymentResult" SET DATA TYPE JSONB;
