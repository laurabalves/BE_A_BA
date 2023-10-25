/*
  Warnings:

  - Added the required column `patch` to the `template` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "template" ADD COLUMN     "patch" VARCHAR(50) NOT NULL;
