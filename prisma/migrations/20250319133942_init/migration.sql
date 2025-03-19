/*
  Warnings:

  - You are about to alter the column `description` on the `itemDevis` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - Added the required column `unite` to the `itemDevis` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "itemDevis" ADD COLUMN     "unite" VARCHAR(255) NOT NULL,
ALTER COLUMN "description" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "quantity" SET DEFAULT 0,
ALTER COLUMN "unitePrice" SET DEFAULT 0,
ALTER COLUMN "total" SET DEFAULT 0;
