/*
  Warnings:

  - You are about to drop the `_AssetToUser` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `_AssetToUser` DROP FOREIGN KEY `_AssetToUser_A_fkey`;

-- DropForeignKey
ALTER TABLE `_AssetToUser` DROP FOREIGN KEY `_AssetToUser_B_fkey`;

-- DropTable
DROP TABLE `_AssetToUser`;

-- CreateTable
CREATE TABLE `_cart` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_cart_AB_unique`(`A`, `B`),
    INDEX `_cart_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_cart` ADD CONSTRAINT `_cart_A_fkey` FOREIGN KEY (`A`) REFERENCES `Asset`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_cart` ADD CONSTRAINT `_cart_B_fkey` FOREIGN KEY (`B`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
