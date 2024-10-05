/*
  Warnings:

  - Added the required column `TriggerName` to the `AvailableTrigger` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "AvailableTrigger" ADD COLUMN     "TriggerName" TEXT NOT NULL;
