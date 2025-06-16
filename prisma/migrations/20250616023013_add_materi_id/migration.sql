/*
  Warnings:

  - You are about to drop the column `soalId` on the `ScoreLatihan` table. All the data in the column will be lost.
  - Added the required column `materiId` to the `ScoreLatihan` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ScoreLatihan" DROP CONSTRAINT "ScoreLatihan_soalId_fkey";

-- AlterTable
ALTER TABLE "ScoreLatihan" DROP COLUMN "soalId",
ADD COLUMN     "materiId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "ScoreLatihan" ADD CONSTRAINT "ScoreLatihan_materiId_fkey" FOREIGN KEY ("materiId") REFERENCES "LatihanMateri"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
