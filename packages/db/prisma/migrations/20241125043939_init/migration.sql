/*
  Warnings:

  - A unique constraint covering the columns `[UserId]` on the table `GmailTraits` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "GmailTraits_UserId_key" ON "GmailTraits"("UserId");
