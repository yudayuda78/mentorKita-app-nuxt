-- CreateTable
CREATE TABLE "AverageScoreTryout" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "score" INTEGER NOT NULL,

    CONSTRAINT "AverageScoreTryout_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "AverageScoreTryout" ADD CONSTRAINT "AverageScoreTryout_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
