/*
  Warnings:

  - You are about to drop the column `addressId` on the `Collect` table. All the data in the column will be lost.
  - You are about to drop the column `addressId` on the `EcoPoint` table. All the data in the column will be lost.
  - You are about to drop the column `addressId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `Address` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Collect" DROP CONSTRAINT "Collect_addressId_fkey";

-- DropForeignKey
ALTER TABLE "EcoPoint" DROP CONSTRAINT "EcoPoint_addressId_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_addressId_fkey";

-- DropIndex
DROP INDEX "EcoPoint_addressId_key";

-- DropIndex
DROP INDEX "User_addressId_key";

-- AlterTable
ALTER TABLE "Collect" DROP COLUMN "addressId";

-- AlterTable
ALTER TABLE "EcoPoint" DROP COLUMN "addressId",
ADD COLUMN     "city" VARCHAR(255),
ADD COLUMN     "complement" VARCHAR(255),
ADD COLUMN     "latitude" DECIMAL(65,30),
ADD COLUMN     "longitude" DECIMAL(65,30),
ADD COLUMN     "neighborhood" VARCHAR(255),
ADD COLUMN     "numberAddress" VARCHAR(255),
ADD COLUMN     "state" VARCHAR(255),
ADD COLUMN     "street" VARCHAR(255),
ADD COLUMN     "zipcode" VARCHAR(8);

-- AlterTable
ALTER TABLE "User" DROP COLUMN "addressId",
ADD COLUMN     "city" VARCHAR(255),
ADD COLUMN     "complement" VARCHAR(255),
ADD COLUMN     "latitude" DECIMAL(65,30),
ADD COLUMN     "longitude" DECIMAL(65,30),
ADD COLUMN     "neighborhood" VARCHAR(255),
ADD COLUMN     "numberAddress" VARCHAR(255),
ADD COLUMN     "state" VARCHAR(255),
ADD COLUMN     "street" VARCHAR(255),
ADD COLUMN     "zipcode" VARCHAR(8);

-- DropTable
DROP TABLE "Address";
