/*
  Warnings:

  - You are about to drop the column `TriggerId` on the `AvailableTrigger` table. All the data in the column will be lost.
  - You are about to drop the column `AvailableTriggerId` on the `Trigger` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[AvailabletriggerId]` on the table `Trigger` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `AvailabletriggerId` to the `Trigger` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "AvailableTrigger" DROP CONSTRAINT "AvailableTrigger_TriggerId_fkey";

-- DropIndex
DROP INDEX "AvailableTrigger_TriggerId_key";

-- AlterTable
ALTER TABLE "AvailableTrigger" DROP COLUMN "TriggerId";

-- AlterTable
ALTER TABLE "Trigger" DROP COLUMN "AvailableTriggerId",
ADD COLUMN     "AvailabletriggerId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Trigger_AvailabletriggerId_key" ON "Trigger"("AvailabletriggerId");

-- AddForeignKey
ALTER TABLE "Trigger" ADD CONSTRAINT "Trigger_AvailabletriggerId_fkey" FOREIGN KEY ("AvailabletriggerId") REFERENCES "AvailableTrigger"("AvailabletriggerId") ON DELETE RESTRICT ON UPDATE CASCADE;
