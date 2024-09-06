/*
  Warnings:

  - You are about to drop the `Category` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_CategoryToLoldleDaily` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `Category` to the `LoldleDaily` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_CategoryToLoldleDaily" DROP CONSTRAINT "_CategoryToLoldleDaily_A_fkey";

-- DropForeignKey
ALTER TABLE "_CategoryToLoldleDaily" DROP CONSTRAINT "_CategoryToLoldleDaily_B_fkey";

-- AlterTable
ALTER TABLE "LoldleDaily" ADD COLUMN     "Category" TEXT NOT NULL;

-- DropTable
DROP TABLE "Category";

-- DropTable
DROP TABLE "_CategoryToLoldleDaily";
