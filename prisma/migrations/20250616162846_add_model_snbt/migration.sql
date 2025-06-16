-- AlterTable
ALTER TABLE "LatihanMateri" ADD COLUMN     "time" INTEGER;

-- CreateTable
CREATE TABLE "SnbtTryout" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "image" TEXT,
    "slug" TEXT,
    "isfree" BOOLEAN NOT NULL,
    "startedAt" TIMESTAMP(3) NOT NULL,
    "endedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SnbtTryout_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SnbtTryoutMateri" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "tryoutId" INTEGER NOT NULL,
    "time" INTEGER NOT NULL,

    CONSTRAINT "SnbtTryoutMateri_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "SnbtTryoutMateri" ADD CONSTRAINT "SnbtTryoutMateri_tryoutId_fkey" FOREIGN KEY ("tryoutId") REFERENCES "SnbtTryout"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
