/*
  Warnings:

  - Added the required column `emailPrev` to the `Recover` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Recover" ADD COLUMN     "emailPrev" TEXT NOT NULL;
