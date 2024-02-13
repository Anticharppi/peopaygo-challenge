/*
  Warnings:

  - Added the required column `employeeId` to the `timesheets` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `timesheets` ADD COLUMN `employeeId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `timesheets` ADD CONSTRAINT `timesheets_employeeId_fkey` FOREIGN KEY (`employeeId`) REFERENCES `employees`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
