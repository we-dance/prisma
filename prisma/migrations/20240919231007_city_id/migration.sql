/*
  Warnings:

  - You are about to drop the column `placeId` on the `City` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "City_placeId_key";

-- AlterTable
ALTER TABLE "City" DROP COLUMN "placeId";
