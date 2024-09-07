/*
  Warnings:

  - A unique constraint covering the columns `[channelID]` on the table `Parserdle` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Parserdle_channelID_key" ON "Parserdle"("channelID");
