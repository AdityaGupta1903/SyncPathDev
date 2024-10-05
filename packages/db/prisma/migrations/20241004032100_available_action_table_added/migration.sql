/*
  Warnings:

  - You are about to drop the column `ActionName` on the `Action` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[AvailableActionId]` on the table `Action` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `AvailableActionId` to the `Action` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Action" DROP COLUMN "ActionName",
ADD COLUMN     "AvailableActionId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "AvailabeAction" (
    "AvailableActionId" TEXT NOT NULL,
    "AvailableActionName" TEXT NOT NULL,

    CONSTRAINT "AvailabeAction_pkey" PRIMARY KEY ("AvailableActionId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Action_AvailableActionId_key" ON "Action"("AvailableActionId");

-- AddForeignKey
ALTER TABLE "Action" ADD CONSTRAINT "Action_AvailableActionId_fkey" FOREIGN KEY ("AvailableActionId") REFERENCES "AvailabeAction"("AvailableActionId") ON DELETE RESTRICT ON UPDATE CASCADE;
