-- CreateTable
CREATE TABLE "Tracking" (
    "id" SERIAL NOT NULL,
    "slug" TEXT NOT NULL,
    "utm_source" TEXT,
    "utm_campaign" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Tracking_pkey" PRIMARY KEY ("id")
);
