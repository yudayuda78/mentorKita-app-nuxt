-- CreateTable
CREATE TABLE "AnswerSnbtUser" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "soalId" INTEGER NOT NULL,
    "jawaban" TEXT NOT NULL,
    "benar" BOOLEAN NOT NULL,
    "materiSoal" TEXT,
    "waktu" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AnswerSnbtUser_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "AnswerSnbtUser" ADD CONSTRAINT "AnswerSnbtUser_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AnswerSnbtUser" ADD CONSTRAINT "AnswerSnbtUser_soalId_fkey" FOREIGN KEY ("soalId") REFERENCES "SnbtSoal"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
