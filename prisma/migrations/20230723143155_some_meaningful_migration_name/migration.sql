/*
  Warnings:

  - You are about to drop the `_cart` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `_cart` DROP FOREIGN KEY `_cart_A_fkey`;

-- DropForeignKey
ALTER TABLE `_cart` DROP FOREIGN KEY `_cart_B_fkey`;

-- DropTable
DROP TABLE `_cart`;

-- CreateTable
CREATE TABLE `_AssetInCart` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_AssetInCart_AB_unique`(`A`, `B`),
    INDEX `_AssetInCart_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_AssetInCart` ADD CONSTRAINT `_AssetInCart_A_fkey` FOREIGN KEY (`A`) REFERENCES `Asset`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_AssetInCart` ADD CONSTRAINT `_AssetInCart_B_fkey` FOREIGN KEY (`B`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
