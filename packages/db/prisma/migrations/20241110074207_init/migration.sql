/*
  Warnings:

  - The `isDriveConnected` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `isGmailConnected` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "isDriveConnected",
ADD COLUMN     "isDriveConnected" BOOLEAN DEFAULT false,
DROP COLUMN "isGmailConnected",
ADD COLUMN     "isGmailConnected" BOOLEAN;
