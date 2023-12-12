-- CreateTable
CREATE TABLE "PortfolioEdu" (
    "id" SERIAL NOT NULL,
    "ballOfWork" INTEGER NOT NULL,
    "category" TEXT NOT NULL,
    "description" TEXT,
    "typeName" TEXT NOT NULL,
    "studentId" INTEGER NOT NULL,

    CONSTRAINT "PortfolioEdu_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PortfolioEdu_id_key" ON "PortfolioEdu"("id");

-- AddForeignKey
ALTER TABLE "PortfolioEdu" ADD CONSTRAINT "PortfolioEdu_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "StudentProfile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
