/*
  Warnings:

  - You are about to drop the column `city` on the `EcoPoint` table. All the data in the column will be lost.
  - You are about to drop the column `collectionsInfo` on the `EcoPoint` table. All the data in the column will be lost.
  - You are about to drop the column `complement` on the `EcoPoint` table. All the data in the column will be lost.
  - You are about to drop the column `latitude` on the `EcoPoint` table. All the data in the column will be lost.
  - You are about to drop the column `longitude` on the `EcoPoint` table. All the data in the column will be lost.
  - You are about to drop the column `neighborhood` on the `EcoPoint` table. All the data in the column will be lost.
  - You are about to drop the column `numberAddress` on the `EcoPoint` table. All the data in the column will be lost.
  - You are about to drop the column `phone` on the `EcoPoint` table. All the data in the column will be lost.
  - You are about to drop the column `state` on the `EcoPoint` table. All the data in the column will be lost.
  - You are about to drop the column `street` on the `EcoPoint` table. All the data in the column will be lost.
  - You are about to drop the column `typeMaterials` on the `EcoPoint` table. All the data in the column will be lost.
  - You are about to drop the column `zipCode` on the `EcoPoint` table. All the data in the column will be lost.
  - You are about to alter the column `serviceHours` on the `EcoPoint` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to drop the column `latitude` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `longitude` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `numberAddress` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `phone` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `zipCode` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[addressId]` on the table `EcoPoint` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[addressId]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `phoneNumber` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "CollectStatus" AS ENUM ('PENDING', 'IN_PROGRESS', 'COMPLETED', 'CANCELED');

-- AlterTable
ALTER TABLE "EcoPoint" DROP COLUMN "city",
DROP COLUMN "collectionsInfo",
DROP COLUMN "complement",
DROP COLUMN "latitude",
DROP COLUMN "longitude",
DROP COLUMN "neighborhood",
DROP COLUMN "numberAddress",
DROP COLUMN "phone",
DROP COLUMN "state",
DROP COLUMN "street",
DROP COLUMN "typeMaterials",
DROP COLUMN "zipCode",
ADD COLUMN     "addressId" INTEGER,
ADD COLUMN     "images" TEXT[],
ADD COLUMN     "infos" VARCHAR(500),
ADD COLUMN     "phoneNumber" VARCHAR(20),
ALTER COLUMN "serviceHours" DROP NOT NULL,
ALTER COLUMN "serviceHours" SET DATA TYPE VARCHAR(255);

-- AlterTable
ALTER TABLE "User" DROP COLUMN "latitude",
DROP COLUMN "longitude",
DROP COLUMN "numberAddress",
DROP COLUMN "phone",
DROP COLUMN "zipCode",
ADD COLUMN     "addressId" INTEGER,
ADD COLUMN     "phoneNumber" VARCHAR(255) NOT NULL;

-- CreateTable
CREATE TABLE "Address" (
    "id" SERIAL NOT NULL,
    "zipcode" VARCHAR(8) NOT NULL,
    "street" VARCHAR(255),
    "numberAddress" VARCHAR(255),
    "neighborhood" VARCHAR(255),
    "city" VARCHAR(255),
    "state" VARCHAR(255),
    "complement" VARCHAR(255),
    "latitude" DOUBLE PRECISION,
    "longitude" DOUBLE PRECISION,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Address_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Collect" (
    "id" SERIAL NOT NULL,
    "scheduledAt" TIMESTAMP(3) NOT NULL,
    "estimatedWeight" TEXT,
    "notes" VARCHAR(250),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" INTEGER NOT NULL,
    "ecoPointId" INTEGER NOT NULL,
    "addressId" INTEGER NOT NULL,
    "status" "CollectStatus" NOT NULL DEFAULT 'PENDING',

    CONSTRAINT "Collect_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CollectMaterial" (
    "id" SERIAL NOT NULL,
    "collectId" INTEGER NOT NULL,
    "materialId" INTEGER NOT NULL,
    "quantity" DOUBLE PRECISION,

    CONSTRAINT "CollectMaterial_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Material" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Material_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_EcoPointMaterials" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_EcoPointMaterials_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "Material_name_key" ON "Material"("name");

-- CreateIndex
CREATE INDEX "_EcoPointMaterials_B_index" ON "_EcoPointMaterials"("B");

-- CreateIndex
CREATE UNIQUE INDEX "EcoPoint_addressId_key" ON "EcoPoint"("addressId");

-- CreateIndex
CREATE UNIQUE INDEX "User_addressId_key" ON "User"("addressId");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_addressId_fkey" FOREIGN KEY ("addressId") REFERENCES "Address"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EcoPoint" ADD CONSTRAINT "EcoPoint_addressId_fkey" FOREIGN KEY ("addressId") REFERENCES "Address"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Collect" ADD CONSTRAINT "Collect_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Collect" ADD CONSTRAINT "Collect_ecoPointId_fkey" FOREIGN KEY ("ecoPointId") REFERENCES "EcoPoint"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Collect" ADD CONSTRAINT "Collect_addressId_fkey" FOREIGN KEY ("addressId") REFERENCES "Address"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CollectMaterial" ADD CONSTRAINT "CollectMaterial_collectId_fkey" FOREIGN KEY ("collectId") REFERENCES "Collect"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CollectMaterial" ADD CONSTRAINT "CollectMaterial_materialId_fkey" FOREIGN KEY ("materialId") REFERENCES "Material"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EcoPointMaterials" ADD CONSTRAINT "_EcoPointMaterials_A_fkey" FOREIGN KEY ("A") REFERENCES "EcoPoint"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EcoPointMaterials" ADD CONSTRAINT "_EcoPointMaterials_B_fkey" FOREIGN KEY ("B") REFERENCES "Material"("id") ON DELETE CASCADE ON UPDATE CASCADE;
