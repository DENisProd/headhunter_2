-- CreateEnum
CREATE TYPE "TransactionType" AS ENUM ('DEPOSIT', 'SUBSCRIPTION_PAYMENT', 'STUDENT_PAYMENT');

-- AlterTable
ALTER TABLE "EmployerProfile" ADD COLUMN     "companyAddress" TEXT NOT NULL DEFAULT '';

-- CreateTable
CREATE TABLE "PaymentAction" (
    "id" SERIAL NOT NULL,
    "value" INTEGER NOT NULL,
    "type" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "employerId" INTEGER NOT NULL,

    CONSTRAINT "PaymentAction_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PaymentAction_id_key" ON "PaymentAction"("id");

-- AddForeignKey
ALTER TABLE "PaymentAction" ADD CONSTRAINT "PaymentAction_employerId_fkey" FOREIGN KEY ("employerId") REFERENCES "EmployerProfile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
