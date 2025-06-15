-- CreateTable
CREATE TABLE "ScoreLatihan" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "soalId" INTEGER NOT NULL,
    "score" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ScoreLatihan_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ScoreLatihan" ADD CONSTRAINT "ScoreLatihan_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ScoreLatihan" ADD CONSTRAINT "ScoreLatihan_soalId_fkey" FOREIGN KEY ("soalId") REFERENCES "LatihanSoal"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
