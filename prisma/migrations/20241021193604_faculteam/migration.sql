-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Department" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "Banner" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "ownerId" INTEGER NOT NULL,

    CONSTRAINT "Department_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Professor" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "profile" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "bio" TEXT NOT NULL,

    CONSTRAINT "Professor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_DepartmentToProfessor" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "_DepartmentToProfessor_AB_unique" ON "_DepartmentToProfessor"("A", "B");

-- CreateIndex
CREATE INDEX "_DepartmentToProfessor_B_index" ON "_DepartmentToProfessor"("B");

-- AddForeignKey
ALTER TABLE "Department" ADD CONSTRAINT "Department_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DepartmentToProfessor" ADD CONSTRAINT "_DepartmentToProfessor_A_fkey" FOREIGN KEY ("A") REFERENCES "Department"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DepartmentToProfessor" ADD CONSTRAINT "_DepartmentToProfessor_B_fkey" FOREIGN KEY ("B") REFERENCES "Professor"("id") ON DELETE CASCADE ON UPDATE CASCADE;
