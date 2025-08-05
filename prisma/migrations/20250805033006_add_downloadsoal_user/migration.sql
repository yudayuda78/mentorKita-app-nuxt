-- CreateTable
CREATE TABLE "public"."DownloadSoalUser" (
    "id" SERIAL NOT NULL,
    "downloadSoalTitle" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "DownloadSoalUser_pkey" PRIMARY KEY ("id")
);
