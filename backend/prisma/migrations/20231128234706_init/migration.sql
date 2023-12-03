/*
  Warnings:

  - Added the required column `description` to the `PortfolioDocument` table without a default value. This is not possible if the table is not empty.
  - Added the required column `firstName` to the `StudentProfile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastName` to the `StudentProfile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `patronymic` to the `StudentProfile` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "PortfolioDocument" ADD COLUMN     "description" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "StudentProfile" ADD COLUMN     "firstName" TEXT NOT NULL,
ADD COLUMN     "lastName" TEXT NOT NULL,
ADD COLUMN     "patronymic" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "PortfolioFile" (
    "id" SERIAL NOT NULL,
    "url" TEXT NOT NULL,
    "size" INTEGER NOT NULL,
    "mimeType" TEXT NOT NULL,
    "portfolioDocumentId" INTEGER NOT NULL,

    CONSTRAINT "PortfolioFile_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PortfolioFile_id_key" ON "PortfolioFile"("id");

-- CreateIndex
CREATE UNIQUE INDEX "PortfolioFile_portfolioDocumentId_key" ON "PortfolioFile"("portfolioDocumentId");

-- AddForeignKey
ALTER TABLE "PortfolioFile" ADD CONSTRAINT "PortfolioFile_portfolioDocumentId_fkey" FOREIGN KEY ("portfolioDocumentId") REFERENCES "PortfolioDocument"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
