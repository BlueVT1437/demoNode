-- AlterTable
ALTER TABLE `Product` ADD COLUMN `type_id` VARCHAR(191) NOT NULL DEFAULT '';

-- AddForeignKey
ALTER TABLE `Product` ADD CONSTRAINT `Product_type_id_fkey` FOREIGN KEY (`type_id`) REFERENCES `ProductType`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
