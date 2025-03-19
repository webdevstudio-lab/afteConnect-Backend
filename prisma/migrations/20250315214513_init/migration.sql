/*
  Warnings:

  - You are about to drop the column `clientId` on the `bonDeLivraison` table. All the data in the column will be lost.
  - You are about to drop the column `nomClient` on the `devis` table. All the data in the column will be lost.
  - You are about to drop the column `clientId` on the `facture` table. All the data in the column will be lost.
  - You are about to drop the column `factureId` on the `itemsFactures` table. All the data in the column will be lost.
  - You are about to drop the `itemsBonDeLivraison` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `description` to the `client` table without a default value. This is not possible if the table is not empty.
  - Added the required column `clientId` to the `devis` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "bonDeLivraison" DROP CONSTRAINT "bonDeLivraison_clientId_fkey";

-- DropForeignKey
ALTER TABLE "facture" DROP CONSTRAINT "facture_clientId_fkey";

-- DropForeignKey
ALTER TABLE "itemsBonDeLivraison" DROP CONSTRAINT "itemsBonDeLivraison_bonDeLivraisonId_fkey";

-- DropForeignKey
ALTER TABLE "itemsFactures" DROP CONSTRAINT "itemsFactures_factureId_fkey";

-- DropIndex
DROP INDEX "client_contact_key";

-- AlterTable
ALTER TABLE "bonDeLivraison" DROP COLUMN "clientId";

-- AlterTable
ALTER TABLE "client" ADD COLUMN     "description" VARCHAR(255) NOT NULL;

-- AlterTable
ALTER TABLE "devis" DROP COLUMN "nomClient",
ADD COLUMN     "clientId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "facture" DROP COLUMN "clientId";

-- AlterTable
ALTER TABLE "itemsFactures" DROP COLUMN "factureId";

-- DropTable
DROP TABLE "itemsBonDeLivraison";

-- CreateTable
CREATE TABLE "ItemsBonDeLivraison" (
    "id" TEXT NOT NULL,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,
    "description" TEXT NOT NULL,
    "unite" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,

    CONSTRAINT "ItemsBonDeLivraison_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "devis" ADD CONSTRAINT "devis_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "client"("id") ON DELETE NO ACTION ON UPDATE CASCADE;
