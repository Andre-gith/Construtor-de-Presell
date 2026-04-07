/*
  Warnings:

  - You are about to drop the column `content` on the `Presell` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Presell" DROP COLUMN "content",
ADD COLUMN     "step1Content" TEXT,
ADD COLUMN     "step2Content" TEXT,
ADD COLUMN     "step3Content" TEXT;
