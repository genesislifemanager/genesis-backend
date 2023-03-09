-- CreateTable
CREATE TABLE "Customer" (
    "custNo" SERIAL NOT NULL,
    "custName" TEXT NOT NULL,
    "custSurname" TEXT NOT NULL,
    "custEmail" TEXT NOT NULL,
    "custMobileNumber" TEXT NOT NULL,

    CONSTRAINT "Customer_pkey" PRIMARY KEY ("custNo")
);

-- CreateTable
CREATE TABLE "Payment" (
    "paymentRefNo" SERIAL NOT NULL,
    "paymentDate" TIMESTAMP(3) NOT NULL,
    "paymentAmount" TEXT NOT NULL,
    "custNo" INTEGER NOT NULL,

    CONSTRAINT "Payment_pkey" PRIMARY KEY ("paymentRefNo")
);
