/*
  Warnings:

  - A unique constraint covering the columns `[UserId]` on the table `Zap` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Trigger_AvailabletriggerId_key";

-- CreateIndex
CREATE UNIQUE INDEX "Zap_UserId_key" ON "Zap"("UserId");
