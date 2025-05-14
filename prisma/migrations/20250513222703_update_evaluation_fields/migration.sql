/*
  Warnings:

  - Added the required column `mental` to the `evaluations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `physical` to the `evaluations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tactical` to the `evaluations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `technical` to the `evaluations` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "evaluations" ADD COLUMN     "mental" INTEGER NOT NULL,
ADD COLUMN     "physical" INTEGER NOT NULL,
ADD COLUMN     "tactical" INTEGER NOT NULL,
ADD COLUMN     "technical" INTEGER NOT NULL;
