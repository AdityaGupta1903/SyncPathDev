/*
  Warnings:

  - Added the required column `ActionName` to the `Action` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Action" ADD COLUMN     "ActionName" TEXT NOT NULL,
ADD COLUMN     "SortingOrder" INTEGER NOT NULL DEFAULT 0;
