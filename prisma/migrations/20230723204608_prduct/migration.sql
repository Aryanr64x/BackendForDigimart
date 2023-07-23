/*
  Warnings:

  - A unique constraint covering the columns `[priceId]` on the table `Asset` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `link` to the `Asset` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Asset` ADD COLUMN `link` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Asset_priceId_key` ON `Asset`(`priceId`);
