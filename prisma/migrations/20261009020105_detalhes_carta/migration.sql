-- AlterTable
ALTER TABLE "Card" ADD COLUMN     "category" TEXT,
ADD COLUMN     "detailsAt" TIMESTAMP(3),
ADD COLUMN     "evolveFrom" TEXT,
ADD COLUMN     "hp" INTEGER,
ADD COLUMN     "pricing" JSONB,
ADD COLUMN     "pricingAt" TIMESTAMP(3),
ADD COLUMN     "stage" TEXT,
ADD COLUMN     "types" TEXT[];
