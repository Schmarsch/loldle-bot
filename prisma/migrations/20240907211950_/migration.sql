/*
  Warnings:

  - The primary key for the `Parserdle` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropIndex
DROP INDEX "Parserdle_channelID_key";

-- AlterTable
ALTER TABLE "Parserdle" DROP CONSTRAINT "Parserdle_pkey",
ADD CONSTRAINT "Parserdle_pkey" PRIMARY KEY ("channelID");
