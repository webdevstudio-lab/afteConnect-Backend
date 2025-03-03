-- CreateTable
CREATE TABLE "demandes" (
    "id" TEXT NOT NULL,
    "createAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdBy" VARCHAR(30) NOT NULL,
    "project" VARCHAR(30) NOT NULL,
    "montant" DOUBLE PRECISION NOT NULL,
    "status" VARCHAR(255) NOT NULL,
    "priorite" VARCHAR(255) NOT NULL,

    CONSTRAINT "demandes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "client" (
    "id" TEXT NOT NULL,
    "createAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fullname" VARCHAR(30) NOT NULL,
    "adresse" VARCHAR(225),
    "type" VARCHAR(30) NOT NULL,
    "contact" VARCHAR(30) NOT NULL,

    CONSTRAINT "client_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "fournisseur" (
    "id" TEXT NOT NULL,
    "createAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fullname" VARCHAR(30) NOT NULL,
    "adresse" VARCHAR(225),
    "type" VARCHAR(30) NOT NULL,
    "contact" VARCHAR(30) NOT NULL,
    "activite" VARCHAR(225) NOT NULL,

    CONSTRAINT "fournisseur_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "client_contact_key" ON "client"("contact");

-- CreateIndex
CREATE UNIQUE INDEX "fournisseur_contact_key" ON "fournisseur"("contact");
