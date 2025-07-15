-- CreateTable
CREATE TABLE "SnbtFinalScore" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "snbtTryoutId" INTEGER NOT NULL,
    "score" INTEGER NOT NULL,

    CONSTRAINT "SnbtFinalScore_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "SnbtFinalScore" ADD CONSTRAINT "SnbtFinalScore_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SnbtFinalScore" ADD CONSTRAINT "SnbtFinalScore_snbtTryoutId_fkey" FOREIGN KEY ("snbtTryoutId") REFERENCES "SnbtTryout"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
