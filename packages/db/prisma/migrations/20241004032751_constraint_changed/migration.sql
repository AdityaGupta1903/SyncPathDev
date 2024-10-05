/*
  Warnings:

  - A unique constraint covering the columns `[ZapId]` on the table `Action` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Action_ZapId_key" ON "Action"("ZapId");
