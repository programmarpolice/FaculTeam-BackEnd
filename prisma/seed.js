const prisma = require("../prisma");
const { faker } = require("@faker-js/faker");

// const seed = async (numDepartments = 3, numProfessor = 5) => {
//   const departments = Array.from({ length: numDepartments }, () => ({
//     name: faker.commerce.department(),
//     description: faker.lorem.paragraphs(1),
//     Banner: faker.image.url(),
//     address: "123 Main Street",
//     phone: faker.phone.number(),
//     ownerId: 3,
//   }));
//   await prisma.department.createMany({ data: departments });
const seed = async (numProfessor = 5) => {
  const professors = Array.from({ length: numProfessor }, () => ({
    name: faker.name.fullName(),
    email: faker.internet.email(),
    profile: faker.image.avatar(),
    bio: faker.lorem.paragraphs(1),
    phone: faker.phone.number(),
  }));
  await prisma.professor.createMany({ data: professors });
};

seed()
  .then(async () => await prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
