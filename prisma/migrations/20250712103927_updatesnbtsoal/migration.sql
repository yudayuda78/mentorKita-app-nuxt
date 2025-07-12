/*
  Warnings:

  - Made the column `guessing` on table `SnbtSoal` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "SnbtSoal" ALTER COLUMN "guessing" SET NOT NULL,
ALTER COLUMN "guessing" SET DEFAULT 0.2;
