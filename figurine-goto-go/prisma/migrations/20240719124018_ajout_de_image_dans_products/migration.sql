/*
  Warnings:

  - Added the required column `image` to the `Products` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Products` ADD COLUMN `image` VARCHAR(191) NOT NULL;
