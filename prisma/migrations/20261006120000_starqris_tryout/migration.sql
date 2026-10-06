-- AlterTable
ALTER TABLE "PaymentSnbtTryout" ADD COLUMN     "amount" INTEGER,
ADD COLUMN     "expiresAt" TIMESTAMP(3),
ADD COLUMN     "invoiceNumber" TEXT,
ADD COLUMN     "orderId" TEXT,
ADD COLUMN     "paidAt" TIMESTAMP(3),
ADD COLUMN     "qrisBase64" TEXT,
ADD COLUMN     "qrisFee" INTEGER,
ADD COLUMN     "qrisPayload" TEXT,
ADD COLUMN     "status" TEXT NOT NULL DEFAULT 'pending',
ADD COLUMN     "statusCheckedAt" TIMESTAMP(3),
ADD COLUMN     "totalAmount" INTEGER,
ADD COLUMN     "uniqueCode" INTEGER;

-- AlterTable
ALTER TABLE "SnbtTryout" ADD COLUMN     "price" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "PaymentSnbtTryout_orderId_key" ON "PaymentSnbtTryout"("orderId");

-- CreateIndex
CREATE UNIQUE INDEX "PaymentSnbtTryout_userId_snbtTryoutId_key" ON "PaymentSnbtTryout"("userId", "snbtTryoutId");
