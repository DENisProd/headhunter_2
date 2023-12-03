-- AlterTable
ALTER TABLE "EmployerProfile" ADD COLUMN     "balance" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "companyName" TEXT NOT NULL DEFAULT '';

-- CreateTable
CREATE TABLE "StudentEducation" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "profile" TEXT NOT NULL,
    "faculty" TEXT NOT NULL,
    "period" TEXT NOT NULL,
    "studentId" INTEGER NOT NULL,

    CONSTRAINT "StudentEducation_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "StudentEducation_id_key" ON "StudentEducation"("id");

-- AddForeignKey
ALTER TABLE "StudentEducation" ADD CONSTRAINT "StudentEducation_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "StudentProfile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
