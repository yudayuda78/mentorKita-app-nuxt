-- CreateTable
CREATE TABLE "LatihanClass" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "LatihanClass_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LatihanCourse" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "latihanClassId" INTEGER NOT NULL,

    CONSTRAINT "LatihanCourse_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LatihanMateri" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "courseId" INTEGER NOT NULL,

    CONSTRAINT "LatihanMateri_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LatihanSoal" (
    "id" SERIAL NOT NULL,
    "question" TEXT NOT NULL,
    "materiId" INTEGER NOT NULL,

    CONSTRAINT "LatihanSoal_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "LatihanCourse" ADD CONSTRAINT "LatihanCourse_latihanClassId_fkey" FOREIGN KEY ("latihanClassId") REFERENCES "LatihanClass"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LatihanMateri" ADD CONSTRAINT "LatihanMateri_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "LatihanCourse"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LatihanSoal" ADD CONSTRAINT "LatihanSoal_materiId_fkey" FOREIGN KEY ("materiId") REFERENCES "LatihanMateri"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
