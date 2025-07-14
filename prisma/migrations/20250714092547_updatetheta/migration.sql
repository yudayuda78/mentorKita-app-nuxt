-- AlterTable
ALTER TABLE "ScoreSnbt" ADD COLUMN     "rawScore" DOUBLE PRECISION,
ADD COLUMN     "theta" DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "thetaGlobal" DOUBLE PRECISION;
