-- AlterTable
ALTER TABLE "User" ADD COLUMN     "avatar" TEXT NOT NULL DEFAULT '';

-- CreateTable
CREATE TABLE "PortfolioDocument" (
    "id" SERIAL NOT NULL,
    "type" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "studentId" INTEGER NOT NULL,

    CONSTRAINT "PortfolioDocument_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PortfolioDocument_id_key" ON "PortfolioDocument"("id");

-- CreateIndex
CREATE UNIQUE INDEX "PortfolioDocument_studentId_key" ON "PortfolioDocument"("studentId");

-- AddForeignKey
ALTER TABLE "PortfolioDocument" ADD CONSTRAINT "PortfolioDocument_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "StudentProfile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
