-- CreateTable
CREATE TABLE "UserClient" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "document" VARCHAR(255) NOT NULL,
    "phone" VARCHAR(255) NOT NULL,
    "cep" VARCHAR(255) NOT NULL,
    "numberAddress" VARCHAR(255) NOT NULL,
    "complement" VARCHAR(255),

    CONSTRAINT "UserClient_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "firstName" VARCHAR(255) NOT NULL,
    "lastName" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "resetCode" TEXT,
    "resetCodeExpires" TIMESTAMP(3),
    "profilePic" TEXT,
    "mobile" VARCHAR(255),
    "document" VARCHAR(255),
    "zipCode" VARCHAR(255),
    "street" VARCHAR(255),
    "number" VARCHAR(255),
    "complement" VARCHAR(255),
    "neighborhood" VARCHAR(255),
    "city" VARCHAR(255),
    "state" CHAR(2),
    "isClient" BOOLEAN NOT NULL DEFAULT false,
    "isCollector" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserClient_email_key" ON "UserClient"("email");

-- CreateIndex
CREATE UNIQUE INDEX "UserClient_document_key" ON "UserClient"("document");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_document_key" ON "User"("document");
