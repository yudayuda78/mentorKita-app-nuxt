/*
  Warnings:

  - You are about to drop the column `amount` on the `PayementSnbtTryout` table. All the data in the column will be lost.
  - You are about to drop the column `paidAt` on the `PayementSnbtTryout` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `PayementSnbtTryout` table. All the data in the column will be lost.
  - Added the required column `snbtMateri` to the `PayementSnbtTryout` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "PayementSnbtTryout" DROP COLUMN "amount",
DROP COLUMN "paidAt",
DROP COLUMN "status",
ADD COLUMN     "isPaid" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "snbtMateri" TEXT NOT NULL;
