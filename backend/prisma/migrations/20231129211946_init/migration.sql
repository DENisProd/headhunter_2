/*
  Warnings:

  - You are about to drop the column `profile` on the `StudentEducation` table. All the data in the column will be lost.
  - Added the required column `specialization` to the `StudentEducation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "StudentEducation" DROP COLUMN "profile",
ADD COLUMN     "specialization" TEXT NOT NULL;
