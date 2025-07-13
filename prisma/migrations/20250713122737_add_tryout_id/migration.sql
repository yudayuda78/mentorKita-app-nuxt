/*
  Warnings:

  - Added the required column `snbtTryoutId` to the `ScoreSnbt` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ScoreSnbt" ADD COLUMN     "snbtTryoutId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "ScoreSnbt" ADD CONSTRAINT "ScoreSnbt_snbtTryoutId_fkey" FOREIGN KEY ("snbtTryoutId") REFERENCES "SnbtTryout"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
