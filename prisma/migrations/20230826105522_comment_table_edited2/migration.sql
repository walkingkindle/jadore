-- CreateTable
CREATE TABLE "Comment" (
    "id" SERIAL NOT NULL,
    "Name" TEXT NOT NULL,
    "Review" TEXT NOT NULL,
    "Rating" INTEGER NOT NULL,
    "ForProductId" TEXT NOT NULL,
    "Date_Added" TEXT
);

-- CreateIndex
CREATE UNIQUE INDEX "Comment_id_key" ON "Comment"("id");
