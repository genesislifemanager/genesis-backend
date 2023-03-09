/*
  Warnings:

  - You are about to drop the `Customer` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Payment` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Customer";

-- DropTable
DROP TABLE "Payment";

-- CreateTable
CREATE TABLE "User" (
    "uid" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("uid")
);

-- CreateTable
CREATE TABLE "Timeblock" (
    "id" SERIAL NOT NULL,
    "uid" TEXT,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "mode" TEXT NOT NULL,
    "s" TIMESTAMP(3),
    "duration" JSONB NOT NULL,
    "e" TIMESTAMP(3),
    "projectId" INTEGER,
    "reminder" TIMESTAMP(3),
    "status" TEXT NOT NULL,

    CONSTRAINT "Timeblock_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Project" (
    "id" SERIAL NOT NULL,
    "uid" TEXT,
    "name" TEXT NOT NULL,
    "duration" JSONB,
    "ventureId" INTEGER,
    "due" TIMESTAMP(3),
    "status" TEXT,

    CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Venture" (
    "id" SERIAL NOT NULL,
    "uid" TEXT,
    "name" TEXT NOT NULL,

    CONSTRAINT "Venture_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Timeblock" ADD CONSTRAINT "Timeblock_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_ventureId_fkey" FOREIGN KEY ("ventureId") REFERENCES "Venture"("id") ON DELETE SET NULL ON UPDATE CASCADE;
