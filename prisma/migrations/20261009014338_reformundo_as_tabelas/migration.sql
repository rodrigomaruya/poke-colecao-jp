/*
  Warnings:

  - The primary key for the `Card` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `CardSet` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[userId,cardId,cardLanguage]` on the table `Collection` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `cardLanguage` to the `Collection` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Card" DROP CONSTRAINT "Card_setId_fkey";

-- DropForeignKey
ALTER TABLE "Collection" DROP CONSTRAINT "Collection_cardId_fkey";

-- DropIndex
DROP INDEX "Card_setId_idx";

-- DropIndex
DROP INDEX "Collection_userId_cardId_key";

-- AlterTable
ALTER TABLE "Card" DROP CONSTRAINT "Card_pkey",
ADD CONSTRAINT "Card_pkey" PRIMARY KEY ("id", "language");

-- AlterTable
ALTER TABLE "CardSet" DROP CONSTRAINT "CardSet_pkey",
ADD COLUMN     "cardCountOfficial" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "cardCountTotal" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "language" TEXT NOT NULL DEFAULT 'pt',
ADD COLUMN     "symbol" TEXT,
ADD CONSTRAINT "CardSet_pkey" PRIMARY KEY ("id", "language");

-- AlterTable
ALTER TABLE "Collection" ADD COLUMN     "cardLanguage" TEXT NOT NULL,
ADD COLUMN     "currency" TEXT NOT NULL DEFAULT 'JPY';

-- CreateIndex
CREATE INDEX "Card_setId_language_idx" ON "Card"("setId", "language");

-- CreateIndex
CREATE UNIQUE INDEX "Collection_userId_cardId_cardLanguage_key" ON "Collection"("userId", "cardId", "cardLanguage");

-- AddForeignKey
ALTER TABLE "Card" ADD CONSTRAINT "Card_setId_language_fkey" FOREIGN KEY ("setId", "language") REFERENCES "CardSet"("id", "language") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Collection" ADD CONSTRAINT "Collection_cardId_cardLanguage_fkey" FOREIGN KEY ("cardId", "cardLanguage") REFERENCES "Card"("id", "language") ON DELETE RESTRICT ON UPDATE CASCADE;
