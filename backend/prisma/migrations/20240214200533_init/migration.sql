-- AlterTable
ALTER TABLE "StudentProfile" ADD COLUMN     "birthday" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "city" TEXT NOT NULL DEFAULT 'г. Ростов-на-Дону',
ADD COLUMN     "employment" TEXT NOT NULL DEFAULT 'Частичная',
ADD COLUMN     "speciality" TEXT NOT NULL DEFAULT 'Начинающий специалист',
ADD COLUMN     "website" TEXT NOT NULL DEFAULT '';

-- CreateTable
CREATE TABLE "StudentWork" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "specialization" TEXT NOT NULL,
    "start" TIMESTAMP(3) NOT NULL,
    "end" TIMESTAMP(3),
    "studentId" INTEGER NOT NULL,

    CONSTRAINT "StudentWork_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "StudentWork_id_key" ON "StudentWork"("id");

-- AddForeignKey
ALTER TABLE "StudentWork" ADD CONSTRAINT "StudentWork_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "StudentProfile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
