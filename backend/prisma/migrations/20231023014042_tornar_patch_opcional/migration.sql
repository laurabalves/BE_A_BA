-- AlterTable
ALTER TABLE "template" ALTER COLUMN "patch" DROP NOT NULL,
ALTER COLUMN "patch" SET DATA TYPE TEXT;
