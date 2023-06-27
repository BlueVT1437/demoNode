/*
  Warnings:

  - You are about to drop the `Type` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `Type`;

-- CreateTable
CREATE TABLE `ProductType` (
    `id` VARCHAR(191) NOT NULL,
    `type` VARCHAR(255) NOT NULL,
    `created_at` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
