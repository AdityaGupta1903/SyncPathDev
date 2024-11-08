/*
  Warnings:

  - You are about to drop the column `GmailRefresToken` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "GmailRefresToken",
ADD COLUMN     "GmailRefreshToken" TEXT;
