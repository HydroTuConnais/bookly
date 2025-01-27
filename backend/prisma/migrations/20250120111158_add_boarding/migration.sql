-- AlterTable
ALTER TABLE "User" ADD COLUMN     "boardingStatus" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "boardingStep" INTEGER NOT NULL DEFAULT 1;
