-- CreateTable
CREATE TABLE "User" (
    "UserId" TEXT NOT NULL,
    "UserName" TEXT NOT NULL,
    "Password" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("UserId")
);

-- CreateTable
CREATE TABLE "Zap" (
    "ZapId" TEXT NOT NULL,
    "ZapName" TEXT NOT NULL,
    "MetaData" JSONB NOT NULL,
    "UserId" TEXT NOT NULL,

    CONSTRAINT "Zap_pkey" PRIMARY KEY ("ZapId")
);

-- CreateTable
CREATE TABLE "Trigger" (
    "TriggerId" TEXT NOT NULL,
    "ZapId" TEXT NOT NULL,
    "AvailableTriggerId" TEXT NOT NULL,

    CONSTRAINT "Trigger_pkey" PRIMARY KEY ("TriggerId")
);

-- CreateTable
CREATE TABLE "Action" (
    "ActionId" TEXT NOT NULL,
    "ZapId" TEXT NOT NULL,

    CONSTRAINT "Action_pkey" PRIMARY KEY ("ActionId")
);

-- CreateTable
CREATE TABLE "ZapRun" (
    "ZapRunId" TEXT NOT NULL,
    "ZapId" TEXT NOT NULL,

    CONSTRAINT "ZapRun_pkey" PRIMARY KEY ("ZapRunId")
);

-- CreateTable
CREATE TABLE "ZapRunOutBox" (
    "ZapRunOutBoxId" TEXT NOT NULL,
    "ZapRunId" TEXT NOT NULL,

    CONSTRAINT "ZapRunOutBox_pkey" PRIMARY KEY ("ZapRunOutBoxId")
);

-- CreateTable
CREATE TABLE "AvailableTrigger" (
    "AvailabletriggerId" TEXT NOT NULL,
    "TriggerId" TEXT NOT NULL,

    CONSTRAINT "AvailableTrigger_pkey" PRIMARY KEY ("AvailabletriggerId")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_UserName_key" ON "User"("UserName");

-- CreateIndex
CREATE UNIQUE INDEX "Trigger_ZapId_key" ON "Trigger"("ZapId");

-- CreateIndex
CREATE UNIQUE INDEX "ZapRunOutBox_ZapRunId_key" ON "ZapRunOutBox"("ZapRunId");

-- CreateIndex
CREATE UNIQUE INDEX "AvailableTrigger_TriggerId_key" ON "AvailableTrigger"("TriggerId");

-- AddForeignKey
ALTER TABLE "Zap" ADD CONSTRAINT "Zap_UserId_fkey" FOREIGN KEY ("UserId") REFERENCES "User"("UserId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Trigger" ADD CONSTRAINT "Trigger_ZapId_fkey" FOREIGN KEY ("ZapId") REFERENCES "Zap"("ZapId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Action" ADD CONSTRAINT "Action_ZapId_fkey" FOREIGN KEY ("ZapId") REFERENCES "Zap"("ZapId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ZapRun" ADD CONSTRAINT "ZapRun_ZapId_fkey" FOREIGN KEY ("ZapId") REFERENCES "Zap"("ZapId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ZapRunOutBox" ADD CONSTRAINT "ZapRunOutBox_ZapRunId_fkey" FOREIGN KEY ("ZapRunId") REFERENCES "ZapRun"("ZapRunId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AvailableTrigger" ADD CONSTRAINT "AvailableTrigger_TriggerId_fkey" FOREIGN KEY ("TriggerId") REFERENCES "Trigger"("TriggerId") ON DELETE RESTRICT ON UPDATE CASCADE;
