-- CreateTable
CREATE TABLE "EcoPoint" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "zipCode" VARCHAR(255) NOT NULL,
    "street" VARCHAR(255) NOT NULL,
    "numberAddress" VARCHAR(255) NOT NULL,
    "complement" VARCHAR(255),
    "neighborhood" VARCHAR(255) NOT NULL,
    "city" VARCHAR(255) NOT NULL,
    "state" VARCHAR(255) NOT NULL,
    "serviceHours" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "collectionsInfo" TEXT NOT NULL,
    "typeMaterials" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "EcoPoint_pkey" PRIMARY KEY ("id")
);
