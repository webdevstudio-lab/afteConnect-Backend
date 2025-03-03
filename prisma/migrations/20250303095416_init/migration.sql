/*
  Warnings:

  - You are about to drop the column `adresse` on the `client` table. All the data in the column will be lost.
  - You are about to drop the column `fullname` on the `client` table. All the data in the column will be lost.
  - You are about to alter the column `contact` on the `client` table. The data in that column could be lost. The data in that column will be cast from `VarChar(30)` to `VarChar(20)`.
  - You are about to drop the column `activite` on the `fournisseur` table. All the data in the column will be lost.
  - You are about to drop the column `adresse` on the `fournisseur` table. All the data in the column will be lost.
  - You are about to drop the column `fullname` on the `fournisseur` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `fournisseur` table. All the data in the column will be lost.
  - You are about to alter the column `contact` on the `fournisseur` table. The data in that column could be lost. The data in that column will be cast from `VarChar(30)` to `VarChar(20)`.
  - You are about to drop the `demandes` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `address` to the `client` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `client` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `client` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updateAt` to the `client` table without a default value. This is not possible if the table is not empty.
  - Added the required column `address` to the `fournisseur` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `fournisseur` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `fournisseur` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updateAt` to the `fournisseur` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "client" DROP COLUMN "adresse",
DROP COLUMN "fullname",
ADD COLUMN     "address" VARCHAR(255) NOT NULL,
ADD COLUMN     "email" VARCHAR(255) NOT NULL,
ADD COLUMN     "name" VARCHAR(255) NOT NULL,
ADD COLUMN     "updateAt" TIMESTAMP NOT NULL,
ALTER COLUMN "type" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "contact" SET DATA TYPE VARCHAR(20);

-- AlterTable
ALTER TABLE "fournisseur" DROP COLUMN "activite",
DROP COLUMN "adresse",
DROP COLUMN "fullname",
DROP COLUMN "updatedAt",
ADD COLUMN     "address" VARCHAR(255) NOT NULL,
ADD COLUMN     "email" VARCHAR(255) NOT NULL,
ADD COLUMN     "name" VARCHAR(255) NOT NULL,
ADD COLUMN     "updateAt" TIMESTAMP NOT NULL,
ALTER COLUMN "type" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "contact" SET DATA TYPE VARCHAR(20);

-- DropTable
DROP TABLE "demandes";

-- CreateTable
CREATE TABLE "projet" (
    "id" TEXT NOT NULL,
    "createAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP NOT NULL,
    "name" VARCHAR(30) NOT NULL,
    "chefProjet" VARCHAR(255) NOT NULL,
    "Budget" INTEGER NOT NULL,
    "description" TEXT NOT NULL DEFAULT 'user',
    "TotalDepense" INTEGER NOT NULL,

    CONSTRAINT "projet_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "devis" (
    "id" TEXT NOT NULL,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,
    "numDevis" VARCHAR(255) NOT NULL,
    "total" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "description" VARCHAR(1000) NOT NULL,
    "hasFacture" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "devis_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "itemDevis" (
    "id" TEXT NOT NULL,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,
    "description" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "unitePrice" INTEGER NOT NULL,
    "total" INTEGER NOT NULL,
    "devisId" TEXT NOT NULL,

    CONSTRAINT "itemDevis_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "facture" (
    "id" TEXT NOT NULL,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,
    "numFacture" VARCHAR(255) NOT NULL,
    "total" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "matricule" VARCHAR(255) NOT NULL,
    "description" VARCHAR(1000) NOT NULL,
    "etat" VARCHAR(255) NOT NULL DEFAULT 'En Attente',
    "numDevis" VARCHAR(255) NOT NULL DEFAULT 'NA',
    "clientId" TEXT NOT NULL,

    CONSTRAINT "facture_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "itemsFactures" (
    "id" TEXT NOT NULL,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,
    "description" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "unite" TEXT NOT NULL,
    "unitePrice" INTEGER NOT NULL,
    "total" INTEGER NOT NULL,
    "factureId" TEXT NOT NULL,

    CONSTRAINT "itemsFactures_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "bonDeLivraison" (
    "id" TEXT NOT NULL,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,
    "numBl" VARCHAR(255) NOT NULL,
    "totalArticle" INTEGER NOT NULL DEFAULT 0,
    "description" VARCHAR(1000) NOT NULL,
    "emetteur" VARCHAR(1000) NOT NULL,
    "clientId" TEXT NOT NULL,

    CONSTRAINT "bonDeLivraison_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "itemsBonDeLivraison" (
    "id" TEXT NOT NULL,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,
    "description" TEXT NOT NULL,
    "unite" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "bonDeLivraisonId" TEXT NOT NULL,

    CONSTRAINT "itemsBonDeLivraison_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "itemDevis" ADD CONSTRAINT "itemDevis_devisId_fkey" FOREIGN KEY ("devisId") REFERENCES "devis"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "facture" ADD CONSTRAINT "facture_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "client"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "itemsFactures" ADD CONSTRAINT "itemsFactures_factureId_fkey" FOREIGN KEY ("factureId") REFERENCES "facture"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bonDeLivraison" ADD CONSTRAINT "bonDeLivraison_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "client"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "itemsBonDeLivraison" ADD CONSTRAINT "itemsBonDeLivraison_bonDeLivraisonId_fkey" FOREIGN KEY ("bonDeLivraisonId") REFERENCES "bonDeLivraison"("id") ON DELETE CASCADE ON UPDATE CASCADE;
