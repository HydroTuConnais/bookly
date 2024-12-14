/*
  Warnings:

  - A unique constraint covering the columns `[urlPublished]` on the table `Document` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Document" ADD COLUMN     "urlPublished" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Document_urlPublished_key" ON "Document"("urlPublished");
