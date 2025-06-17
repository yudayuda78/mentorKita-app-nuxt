-- AlterTable
ALTER TABLE "SnbtTryout" ADD COLUMN     "isclosed" BOOLEAN,
ADD COLUMN     "marketing" TEXT,
ALTER COLUMN "isfree" DROP NOT NULL;
