-- CreateTable
CREATE TABLE "public"."MiniQuiz" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT,
    "thumbnail" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MiniQuiz_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."SoalMiniQuiz" (
    "id" SERIAL NOT NULL,
    "nomorSoal" INTEGER,
    "question" TEXT NOT NULL,
    "questionImage" TEXT,
    "optionA" TEXT,
    "optionAImage" TEXT,
    "optionB" TEXT,
    "optionBImage" TEXT,
    "optionC" TEXT,
    "optionCImage" TEXT,
    "optionD" TEXT,
    "optionDImage" TEXT,
    "optionE" TEXT,
    "optionEImage" TEXT,
    "correctOption" "public"."AnswerOption",
    "correctEssay" TEXT,
    "pembahasan" TEXT,
    "miniQuizId" INTEGER NOT NULL,

    CONSTRAINT "SoalMiniQuiz_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "MiniQuiz_slug_key" ON "public"."MiniQuiz"("slug");

-- AddForeignKey
ALTER TABLE "public"."SoalMiniQuiz" ADD CONSTRAINT "SoalMiniQuiz_miniQuizId_fkey" FOREIGN KEY ("miniQuizId") REFERENCES "public"."MiniQuiz"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
