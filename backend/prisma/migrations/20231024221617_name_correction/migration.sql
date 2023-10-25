/*
  Warnings:

  - You are about to drop the column `patch` on the `template` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "template" DROP COLUMN "patch",
ADD COLUMN     "path" TEXT;
