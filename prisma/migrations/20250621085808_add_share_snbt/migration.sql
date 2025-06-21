-- CreateTable
CREATE TABLE "PayementSnbtTryout" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "snbtTryoutId" INTEGER NOT NULL,
    "amount" INTEGER NOT NULL,
    "status" TEXT NOT NULL,
    "paidAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PayementSnbtTryout_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ShareSnbt" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "snbtTryoutId" INTEGER NOT NULL,
    "isShared" BOOLEAN NOT NULL DEFAULT true,
    "sharedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ShareSnbt_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "PayementSnbtTryout" ADD CONSTRAINT "PayementSnbtTryout_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PayementSnbtTryout" ADD CONSTRAINT "PayementSnbtTryout_snbtTryoutId_fkey" FOREIGN KEY ("snbtTryoutId") REFERENCES "SnbtTryout"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ShareSnbt" ADD CONSTRAINT "ShareSnbt_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ShareSnbt" ADD CONSTRAINT "ShareSnbt_snbtTryoutId_fkey" FOREIGN KEY ("snbtTryoutId") REFERENCES "SnbtTryout"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
