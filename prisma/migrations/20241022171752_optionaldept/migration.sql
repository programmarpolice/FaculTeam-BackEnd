-- DropForeignKey
ALTER TABLE "Professor" DROP CONSTRAINT "Professor_DepartmentId_fkey";

-- AlterTable
ALTER TABLE "Professor" ALTER COLUMN "DepartmentId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Professor" ADD CONSTRAINT "Professor_DepartmentId_fkey" FOREIGN KEY ("DepartmentId") REFERENCES "Department"("id") ON DELETE SET NULL ON UPDATE CASCADE;
