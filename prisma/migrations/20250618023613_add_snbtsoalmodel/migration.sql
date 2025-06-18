-- CreateTable
CREATE TABLE "SnbtSoal" (
    "id" SERIAL NOT NULL,
    "nomorSoal" INTEGER,
    "question" TEXT NOT NULL,
    "type" "SoalType" NOT NULL DEFAULT 'PILIHAN_GANDA',
    "optionA" TEXT,
    "optionB" TEXT,
    "optionC" TEXT,
    "optionD" TEXT,
    "optionE" TEXT,
    "correctOption" "AnswerOption",
    "correctEssay" TEXT,
    "materiSoal" TEXT,
    "snbtMateriId" INTEGER NOT NULL,

    CONSTRAINT "SnbtSoal_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "SnbtSoal" ADD CONSTRAINT "SnbtSoal_snbtMateriId_fkey" FOREIGN KEY ("snbtMateriId") REFERENCES "SnbtTryoutMateri"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
