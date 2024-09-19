/*
  Warnings:

  - A unique constraint covering the columns `[placeId]` on the table `City` will be added. If there are existing duplicate values, this will fail.
  - Made the column `placeId` on table `City` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "City" ALTER COLUMN "placeId" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "City_placeId_key" ON "City"("placeId");
