-- AlterTable
ALTER TABLE "User" ADD COLUMN     "confirmHash" TEXT DEFAULT '',
ADD COLUMN     "confirmHashCreated" TIMESTAMP(3),
ADD COLUMN     "emailConfirmed" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "resetHash" TEXT DEFAULT '',
ADD COLUMN     "resetHashCreated" TIMESTAMP(3);
