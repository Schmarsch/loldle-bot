/*
  Warnings:

  - You are about to drop the column `Category` on the `LoldleDaily` table. All the data in the column will be lost.
  - Added the required column `Categories` to the `LoldleDaily` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "LoldleDaily" DROP COLUMN "Category",
ADD COLUMN     "Categories" TEXT NOT NULL;
