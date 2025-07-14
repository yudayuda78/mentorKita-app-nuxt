-- CreateEnum
CREATE TYPE "SnbtType" AS ENUM ('TES_PORTENSI_SKOLASTIK', 'TES_LITERASI');

-- AlterTable
ALTER TABLE "SnbtTryoutMateri" ADD COLUMN     "type" "SnbtType";
