-- AlterTable
ALTER TABLE "PortfolioEdu" ADD COLUMN     "ekAnotation" TEXT,
ADD COLUMN     "ekTarget" TEXT,
ADD COLUMN     "keywords" TEXT,
ALTER COLUMN "name" DROP NOT NULL;
