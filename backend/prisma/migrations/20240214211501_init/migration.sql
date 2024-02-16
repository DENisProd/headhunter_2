/*
  Warnings:

  - Made the column `end` on table `StudentWork` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "StudentWork" ALTER COLUMN "start" SET DATA TYPE TEXT,
ALTER COLUMN "end" SET NOT NULL,
ALTER COLUMN "end" SET DEFAULT '',
ALTER COLUMN "end" SET DATA TYPE TEXT;
