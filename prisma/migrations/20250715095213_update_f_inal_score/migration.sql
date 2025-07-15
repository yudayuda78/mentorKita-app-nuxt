/*
  Warnings:

  - A unique constraint covering the columns `[userId,snbtTryoutId]` on the table `SnbtFinalScore` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "SnbtFinalScore_userId_snbtTryoutId_key" ON "SnbtFinalScore"("userId", "snbtTryoutId");
