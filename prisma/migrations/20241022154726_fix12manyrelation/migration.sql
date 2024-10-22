/*
  Warnings:

  - You are about to drop the column `ownerId` on the `Department` table. All the data in the column will be lost.
  - You are about to drop the `_DepartmentToProfessor` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `DepartmentId` to the `Professor` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Department" DROP CONSTRAINT "Department_ownerId_fkey";

-- DropForeignKey
ALTER TABLE "_DepartmentToProfessor" DROP CONSTRAINT "_DepartmentToProfessor_A_fkey";

-- DropForeignKey
ALTER TABLE "_DepartmentToProfessor" DROP CONSTRAINT "_DepartmentToProfessor_B_fkey";

-- AlterTable
ALTER TABLE "Department" DROP COLUMN "ownerId";

-- AlterTable
ALTER TABLE "Professor" ADD COLUMN     "DepartmentId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "_DepartmentToProfessor";

-- AddForeignKey
ALTER TABLE "Professor" ADD CONSTRAINT "Professor_DepartmentId_fkey" FOREIGN KEY ("DepartmentId") REFERENCES "Department"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
