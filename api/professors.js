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
  const { name, email, profile, phone, bio, department } = req.body;
  try {
    const professor = await prisma.professor.create({
      data: {
        name,
        email,
        profile,
        phone,
        bio,
        department: { connect: { id: department } },
      },
    });
    res.status(201).json(professor);
  } catch (e) {
    next(e);
  }
});

module.exports = router;
