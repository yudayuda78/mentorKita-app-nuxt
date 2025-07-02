/*
  Warnings:

  - You are about to drop the `PayementSnbtTryout` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "PayementSnbtTryout" DROP CONSTRAINT "PayementSnbtTryout_snbtTryoutId_fkey";

-- DropForeignKey
ALTER TABLE "PayementSnbtTryout" DROP CONSTRAINT "PayementSnbtTryout_userId_fkey";

-- DropTable
DROP TABLE "PayementSnbtTryout";

-- CreateTable
CREATE TABLE "PaymentSnbtTryout" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "snbtTryoutId" INTEGER NOT NULL,
    "snbtMateri" TEXT NOT NULL,
    "isPaid" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PaymentSnbtTryout_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "PaymentSnbtTryout" ADD CONSTRAINT "PaymentSnbtTryout_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PaymentSnbtTryout" ADD CONSTRAINT "PaymentSnbtTryout_snbtTryoutId_fkey" FOREIGN KEY ("snbtTryoutId") REFERENCES "SnbtTryout"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
