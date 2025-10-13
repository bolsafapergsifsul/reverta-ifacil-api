/*
  Warnings:

  - You are about to drop the `UserClient` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "UserClient";

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "document" VARCHAR(255) NOT NULL,
    "phone" VARCHAR(255) NOT NULL,
    "cep" VARCHAR(255) NOT NULL,
    "numberAddress" VARCHAR(255) NOT NULL,
    "complement" VARCHAR(255),

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_document_key" ON "User"("document");
