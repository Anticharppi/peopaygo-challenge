/*
  Warnings:

  - You are about to drop the column `created_at` on the `employees` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `employees` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `timesheets` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `timesheets` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `employees` DROP COLUMN `created_at`,
    DROP COLUMN `updated_at`;

-- AlterTable
ALTER TABLE `timesheets` DROP COLUMN `created_at`,
    DROP COLUMN `updated_at`;
