/*
  Warnings:

  - You are about to drop the column `cep` on the `User` table. All the data in the column will be lost.
  - Added the required column `city` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `neighborhood` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `state` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `street` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `zipCode` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "cep",
ADD COLUMN     "city" VARCHAR(255) NOT NULL,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "neighborhood" VARCHAR(255) NOT NULL,
ADD COLUMN     "profilePic" TEXT,
ADD COLUMN     "resetCodeExpiration" TIMESTAMP(3),
ADD COLUMN     "state" VARCHAR(255) NOT NULL,
ADD COLUMN     "street" VARCHAR(255) NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "zipCode" VARCHAR(255) NOT NULL;
