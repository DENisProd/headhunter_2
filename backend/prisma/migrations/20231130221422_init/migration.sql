-- AlterTable
ALTER TABLE "StudentProfile" ADD COLUMN     "interests" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "skills" TEXT NOT NULL DEFAULT '';

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "phone" INTEGER NOT NULL DEFAULT 0;
