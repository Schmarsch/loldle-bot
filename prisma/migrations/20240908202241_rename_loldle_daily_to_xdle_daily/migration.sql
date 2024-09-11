/*
  Warnings:

  - You are about to drop the `LoldleDaily` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "LoldleDaily" DROP CONSTRAINT "LoldleDaily_userId_fkey";

-- DropTable
DROP TABLE "LoldleDaily";

-- CreateTable
CREATE TABLE "XdleDaily" (
    "id" TEXT NOT NULL,
    "date" DATE NOT NULL,
    "Categories" TEXT NOT NULL,
    "userId" TEXT,

    CONSTRAINT "XdleDaily_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "XdleDaily" ADD CONSTRAINT "XdleDaily_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
