-- CreateTable
CREATE TABLE "ClickSnbtTryout" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "snbtTryoutId" INTEGER NOT NULL,
    "snbtMateri" TEXT NOT NULL,
    "clickedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ClickSnbtTryout_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ClickSnbtTryout" ADD CONSTRAINT "ClickSnbtTryout_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClickSnbtTryout" ADD CONSTRAINT "ClickSnbtTryout_snbtTryoutId_fkey" FOREIGN KEY ("snbtTryoutId") REFERENCES "SnbtTryout"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
