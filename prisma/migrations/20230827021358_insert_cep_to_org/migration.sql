/*
  Warnings:

  - Added the required column `cep` to the `orgs` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "orgs" ADD COLUMN     "cep" INTEGER NOT NULL;
