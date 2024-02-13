/*
  Warnings:

  - You are about to drop the column `payment_type` on the `timesheets` table. All the data in the column will be lost.
  - You are about to drop the column `rate` on the `timesheets` table. All the data in the column will be lost.
  - Added the required column `payment_type` to the `employees` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rate` to the `employees` table without a default value. This is not possible if the table is not empty.
  - Added the required column `from` to the `timesheets` table without a default value. This is not possible if the table is not empty.
  - Added the required column `to` to the `timesheets` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `employees` ADD COLUMN `payment_type` ENUM('Hourly', 'Salary') NOT NULL,
    ADD COLUMN `rate` DOUBLE NOT NULL;

-- AlterTable
ALTER TABLE `timesheets` DROP COLUMN `payment_type`,
    DROP COLUMN `rate`,
    ADD COLUMN `emitted_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `from` DATETIME(3) NOT NULL,
    ADD COLUMN `to` DATETIME(3) NOT NULL;
