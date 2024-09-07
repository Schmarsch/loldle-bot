/*
  Warnings:

  - The primary key for the `Parserdle` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Parserdle` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Parserdle" DROP CONSTRAINT "Parserdle_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "Parserdle_pkey" PRIMARY KEY ("channelID", "guildID");
