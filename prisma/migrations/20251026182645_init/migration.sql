/*
  Warnings:

  - You are about to drop the column `city` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `complement` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `neighborhood` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `numberAddress` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `state` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `street` on the `User` table. All the data in the column will be lost.
  - Added the required column `latitude` to the `EcoPoint` table without a default value. This is not possible if the table is not empty.
  - Added the required column `longitude` to the `EcoPoint` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "EcoPoint" ADD COLUMN     "latitude" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "longitude" DOUBLE PRECISION NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "city",
DROP COLUMN "complement",
DROP COLUMN "neighborhood",
DROP COLUMN "numberAddress",
DROP COLUMN "state",
DROP COLUMN "street",
ADD COLUMN     "latitude" DOUBLE PRECISION,
ADD COLUMN     "longitude" DOUBLE PRECISION;
