/*
  Warnings:

  - You are about to drop the column `hasFacture` on the `devis` table. All the data in the column will be lost.
  - Added the required column `nomClient` to the `devis` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "devis" DROP COLUMN "hasFacture",
ADD COLUMN     "nomClient" VARCHAR(1000) NOT NULL;
