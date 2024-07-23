/*
  Warnings:

  - You are about to drop the `cartHasProducts` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `cartHasProducts` DROP FOREIGN KEY `cartHasProducts_cartId_fkey`;

-- DropForeignKey
ALTER TABLE `cartHasProducts` DROP FOREIGN KEY `cartHasProducts_productsId_fkey`;

-- DropTable
DROP TABLE `cartHasProducts`;

-- CreateTable
CREATE TABLE `CartHasProducts` (
    `id` VARCHAR(191) NOT NULL,
    `quantity` INTEGER NOT NULL,
    `cartId` VARCHAR(191) NOT NULL,
    `productsId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `CartHasProducts` ADD CONSTRAINT `CartHasProducts_cartId_fkey` FOREIGN KEY (`cartId`) REFERENCES `Cart`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CartHasProducts` ADD CONSTRAINT `CartHasProducts_productsId_fkey` FOREIGN KEY (`productsId`) REFERENCES `Products`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
