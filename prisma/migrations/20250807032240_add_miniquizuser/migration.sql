-- CreateTable
CREATE TABLE "public"."MiniQuizUser" (
    "id" SERIAL NOT NULL,
    "miniQuizTitle" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "MiniQuizUser_pkey" PRIMARY KEY ("id")
);
