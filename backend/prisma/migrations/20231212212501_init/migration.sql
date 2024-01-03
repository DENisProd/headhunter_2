/*
  Warnings:

  - Made the column `category` on table `PortfolioEdu` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "PortfolioEdu" ALTER COLUMN "category" SET NOT NULL;
