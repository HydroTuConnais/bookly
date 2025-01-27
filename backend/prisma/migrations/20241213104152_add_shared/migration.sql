-- CreateTable
CREATE TABLE "_SharedDocuments" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_SharedDocuments_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_SharedDocuments_B_index" ON "_SharedDocuments"("B");

-- AddForeignKey
ALTER TABLE "_SharedDocuments" ADD CONSTRAINT "_SharedDocuments_A_fkey" FOREIGN KEY ("A") REFERENCES "Document"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SharedDocuments" ADD CONSTRAINT "_SharedDocuments_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
