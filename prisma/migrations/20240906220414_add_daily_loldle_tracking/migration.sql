-- CreateTable
CREATE TABLE "LoldleDaily" (
    "id" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "userId" TEXT,

    CONSTRAINT "LoldleDaily_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Category" (
    "id" SERIAL NOT NULL,
    "type" TEXT NOT NULL,
    "score" INTEGER NOT NULL,
    "perfect" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_CategoryToLoldleDaily" (
    "A" INTEGER NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_CategoryToLoldleDaily_AB_unique" ON "_CategoryToLoldleDaily"("A", "B");

-- CreateIndex
CREATE INDEX "_CategoryToLoldleDaily_B_index" ON "_CategoryToLoldleDaily"("B");

-- AddForeignKey
ALTER TABLE "LoldleDaily" ADD CONSTRAINT "LoldleDaily_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CategoryToLoldleDaily" ADD CONSTRAINT "_CategoryToLoldleDaily_A_fkey" FOREIGN KEY ("A") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CategoryToLoldleDaily" ADD CONSTRAINT "_CategoryToLoldleDaily_B_fkey" FOREIGN KEY ("B") REFERENCES "LoldleDaily"("id") ON DELETE CASCADE ON UPDATE CASCADE;
