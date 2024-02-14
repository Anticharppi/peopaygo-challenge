/*
  Warnings:

  - Added the required column `payment_type` to the `timesheets` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rate` to the `timesheets` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `timesheets` ADD COLUMN `payment_type` ENUM('Hourly', 'Salary') NOT NULL,
    ADD COLUMN `rate` DOUBLE NOT NULL;
