-- CreateTable
CREATE TABLE "EnrollmentSnbtTryout" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "snbtTryoutId" INTEGER NOT NULL,
    "isPaid" BOOLEAN NOT NULL DEFAULT false,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "EnrollmentSnbtTryout_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "EnrollmentSnbtTryout" ADD CONSTRAINT "EnrollmentSnbtTryout_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EnrollmentSnbtTryout" ADD CONSTRAINT "EnrollmentSnbtTryout_snbtTryoutId_fkey" FOREIGN KEY ("snbtTryoutId") REFERENCES "SnbtTryout"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
