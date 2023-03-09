/*
  Warnings:

  - You are about to drop the column `paymentDate` on the `Payment` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[custEmail]` on the table `Customer` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Payment" DROP COLUMN "paymentDate";

-- CreateIndex
CREATE UNIQUE INDEX "Customer_custEmail_key" ON "Customer"("custEmail");
