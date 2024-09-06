/*
  Warnings:

  - A unique constraint covering the columns `[type]` on the table `Category` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[score]` on the table `Category` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[perfect]` on the table `Category` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Category_type_key" ON "Category"("type");

-- CreateIndex
CREATE UNIQUE INDEX "Category_score_key" ON "Category"("score");

-- CreateIndex
CREATE UNIQUE INDEX "Category_perfect_key" ON "Category"("perfect");
