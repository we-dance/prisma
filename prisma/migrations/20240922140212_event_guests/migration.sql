/*
  Warnings:

  - The `root` column on the `DanceStyle` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "DanceStyle" ADD COLUMN     "intro" TEXT,
ADD COLUMN     "video" TEXT,
DROP COLUMN "root",
ADD COLUMN     "root" BOOLEAN;

-- CreateTable
CREATE TABLE "Guest" (
    "id" TEXT NOT NULL,
    "profileId" TEXT NOT NULL,
    "eventId" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "invitedAt" TIMESTAMP(3),
    "confirmedAt" TIMESTAMP(3),
    "cancelledAt" TIMESTAMP(3),
    "registeredAt" TIMESTAMP(3),
    "waitlistedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Guest_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Guest_profileId_eventId_key" ON "Guest"("profileId", "eventId");

-- AddForeignKey
ALTER TABLE "Guest" ADD CONSTRAINT "Guest_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "Profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Guest" ADD CONSTRAINT "Guest_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
