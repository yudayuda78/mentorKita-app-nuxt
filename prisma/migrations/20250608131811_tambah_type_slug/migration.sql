-- CreateEnum
CREATE TYPE "SoalType" AS ENUM ('PILIHAN_GANDA', 'ESAI');

-- CreateEnum
CREATE TYPE "AnswerOption" AS ENUM ('A', 'B', 'C', 'D', 'E');

-- AlterTable
ALTER TABLE "LatihanMateri" ADD COLUMN     "slug" TEXT;

-- AlterTable
ALTER TABLE "LatihanSoal" ADD COLUMN     "correctEssay" TEXT,
ADD COLUMN     "correctOption" "AnswerOption",
ADD COLUMN     "optionA" TEXT,
ADD COLUMN     "optionB" TEXT,
ADD COLUMN     "optionC" TEXT,
ADD COLUMN     "optionD" TEXT,
ADD COLUMN     "optionE" TEXT,
ADD COLUMN     "type" "SoalType" NOT NULL DEFAULT 'PILIHAN_GANDA';

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);
