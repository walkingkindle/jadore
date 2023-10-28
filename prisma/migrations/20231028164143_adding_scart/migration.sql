-- CreateTable
CREATE TABLE "ShoppingCart" (
    "id" SERIAL NOT NULL,
    "Name" TEXT NOT NULL,
    "Quantity" INTEGER NOT NULL,
    "Status" TEXT NOT NULL,
    "Price" DOUBLE PRECISION NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "ShoppingCart_id_key" ON "ShoppingCart"("id");
