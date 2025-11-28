/*
  Warnings:

  - You are about to drop the column `zipcode` on the `EcoPoint` table. All the data in the column will be lost.
  - You are about to drop the column `zipcode` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "EcoPoint" DROP COLUMN "zipcode",
ADD COLUMN     "zipCode" VARCHAR(8);

-- AlterTable
ALTER TABLE "User" DROP COLUMN "zipcode",
ADD COLUMN     "zipCode" VARCHAR(8);
