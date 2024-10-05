/*
  Warnings:

  - You are about to drop the column `MetaData` on the `Zap` table. All the data in the column will be lost.
  - Added the required column `MetaData` to the `ZapRun` table without a default value. This is not possible if the table is not empty.
  - Added the required column `MetaData` to the `ZapRunOutBox` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Zap" DROP COLUMN "MetaData";

-- AlterTable
ALTER TABLE "ZapRun" ADD COLUMN     "MetaData" JSONB NOT NULL;

-- AlterTable
ALTER TABLE "ZapRunOutBox" ADD COLUMN     "MetaData" JSONB NOT NULL;
