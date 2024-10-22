const prisma = require("../prisma");
const { faker } = require("@faker-js/faker");

const seed = async (numDepts = 5, numProfessors = 20) => {
  const departments = Array.from({ length: numDepts }, () => ({
    name: faker.commerce.department(),
    description: faker.lorem.paragraphs(1),
    Banner: faker.image.url(),
    address: faker.location.buildingNumber(),
    phone: faker.phone.number(),
  }));
  await prisma.department.createMany({ data: departments });

  const professors = Array.from({ length: numProfessors }, () => ({
    name: faker.person.fullName(),
    email: faker.internet.email(),
    profile: faker.image.avatar(),
    bio: faker.lorem.paragraphs(1),
    phone: faker.phone.number(),
    DepartmentId: faker.number.int({ min: 1, max: numDepts }),
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
