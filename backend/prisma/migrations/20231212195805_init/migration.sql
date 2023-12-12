/*
  Warnings:

  - A unique constraint covering the columns `[studentId]` on the table `PortfolioEdu` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "PortfolioEdu_studentId_key" ON "PortfolioEdu"("studentId");
