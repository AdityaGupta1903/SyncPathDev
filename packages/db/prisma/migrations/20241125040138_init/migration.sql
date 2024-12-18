-- CreateTable
CREATE TABLE "GmailTraits" (
    "TraitId" TEXT NOT NULL,
    "Traitname" TEXT NOT NULL,
    "UserId" TEXT NOT NULL,

    CONSTRAINT "GmailTraits_pkey" PRIMARY KEY ("TraitId")
);

-- AddForeignKey
ALTER TABLE "GmailTraits" ADD CONSTRAINT "GmailTraits_UserId_fkey" FOREIGN KEY ("UserId") REFERENCES "User"("UserId") ON DELETE RESTRICT ON UPDATE CASCADE;
