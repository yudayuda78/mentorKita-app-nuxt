-- CreateTable
CREATE TABLE "ScoreSnbt" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "materiId" INTEGER NOT NULL,
    "score" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ScoreSnbt_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ScoreSnbt" ADD CONSTRAINT "ScoreSnbt_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ScoreSnbt" ADD CONSTRAINT "ScoreSnbt_materiId_fkey" FOREIGN KEY ("materiId") REFERENCES "SnbtTryoutMateri"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
