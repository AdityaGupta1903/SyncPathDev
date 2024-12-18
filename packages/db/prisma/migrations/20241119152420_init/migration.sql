-- AlterTable
ALTER TABLE "User" ADD COLUMN     "SpreadSheetAccessToken" TEXT,
ADD COLUMN     "SpreadSheetRefreshToken" TEXT,
ADD COLUMN     "isSpreadSheetConnected" BOOLEAN DEFAULT false;
