-- AlterTable
ALTER TABLE "LatihanSoal" ADD COLUMN     "materiSoal" TEXT;

-- CreateTable
CREATE TABLE "AnswerLatihanUser" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "soalId" INTEGER NOT NULL,
    "jawaban" TEXT NOT NULL,
    "benar" BOOLEAN NOT NULL,
    "waktu" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AnswerLatihanUser_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "AnswerLatihanUser" ADD CONSTRAINT "AnswerLatihanUser_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AnswerLatihanUser" ADD CONSTRAINT "AnswerLatihanUser_soalId_fkey" FOREIGN KEY ("soalId") REFERENCES "LatihanSoal"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
