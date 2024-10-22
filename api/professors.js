const express = require("express");
const router = express.Router();

const { authenticate } = require("./auth");
const prisma = require("../prisma");

router.get("/", async (req, res, next) => {
  try {
    const professors = await prisma.professor.findMany();
    res.json(professors);
  } catch (e) {
    next(e);
  }
});

router.get("/:id", async (req, res, next) => {
  const { id } = req.params;
  const includeDept = req.user ? { where: { ownerId: req.user.id } } : false;
  try {
    const professor = await prisma.professor.findUniqueOrThrow({
      where: { id: +id },
    });
    res.json(professor);
  } catch (e) {
    next(e);
  }
});

router.post("/", authenticate, async (req, res, next) => {
  const { name, email, profile, phone, bio, DepartmentId } = req.body;
  try {
    const professor = await prisma.professor.create({
      data: {
        name,
        email,
        profile,
        phone,
        bio,
        DepartmentId: DepartmentId,
      },
    });
    res.status(201).json(professor);
  } catch (e) {
    next(e);
  }
});

router.put("/:id", authenticate, async (req, res, next) => {
  const { id } = req.params;
  const { name, email, profile, phone, bio, Department } = req.body;
  try {
    // Check if the professor exists
    const professor = await prisma.professor.findUnique({
      where: { id: +id },
    });
    if (!professor) {
      return next({
        status: 404,
        message: `Professor with id ${id} does not exist.`,
      });
    }

    // Update the professor
    const updatedProfessor = await prisma.professor.update({
      where: { id: +id },
      data: { name, email, profile, phone, bio, Department },
    });
    res.json(updatedProfessor);
  } catch (e) {
    next(e);
  }
});

router.delete("/:id", authenticate, async (req, res, next) => {
  const { id } = req.params;

  try {
    // Check if the professor exists
    const professor = await prisma.professor.findUnique({
      where: { id: +id },
    });
    if (!professor) {
      return next({
        status: 404,
        message: `Professor with id ${id} does not exist.`,
      });
    }

    // Delete the professor
    await prisma.professor.delete({ where: { id: +id } });
    res.sendStatus(204);
  } catch (e) {
    next(e);
  }
});
module.exports = router;
