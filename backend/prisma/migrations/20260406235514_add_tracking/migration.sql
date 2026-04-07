/*
  Warnings:

  - Made the column `redirectUrl` on table `Presell` required. This step will fail if there are existing NULL values in that column.
  - Made the column `step1Content` on table `Presell` required. This step will fail if there are existing NULL values in that column.
  - Made the column `step2Content` on table `Presell` required. This step will fail if there are existing NULL values in that column.
  - Made the column `step3Content` on table `Presell` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `step` to the `Tracking` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Presell" ALTER COLUMN "redirectUrl" SET NOT NULL,
ALTER COLUMN "step1Content" SET NOT NULL,
ALTER COLUMN "step2Content" SET NOT NULL,
ALTER COLUMN "step3Content" SET NOT NULL;

-- AlterTable
ALTER TABLE "Tracking" ADD COLUMN     "step" TEXT NOT NULL;
