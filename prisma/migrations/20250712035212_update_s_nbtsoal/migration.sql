/*
  Warnings:

  - A unique constraint covering the columns `[userId,materiId]` on the table `ScoreSnbt` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "ScoreSnbt_userId_materiId_key" ON "ScoreSnbt"("userId", "materiId");
