const express = require("express");
const router = express.Router();

const { authenticate } = require("./auth");
const prisma = require("../prisma");

router.get("/", async (req, res, next) => {
  try {
    const departments = await prisma.department.findMany({
      include: { Professors: true },
    });
    res.json(departments);
  } catch (e) {
    next(e);
  }
});

router.get("/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const department = await prisma.department.findUniqueOrThrow({
      where: { id: +id },
      include: { Professors: true },
    });
    res.json(department);
  } catch (e) {
    next(e);
  }
});

router.put("/:id", authenticate, async (req, res, next) => {
  const { id } = req.params;
  const { name, description, Banner, address, phone } = req.body;
  try {
    // Check if the department exists
    const department = await prisma.department.findUnique({
      where: { id: +id },
    });
    if (!department) {
      return next({
        status: 404,
        message: `department with id ${id} does not exist.`,
      });
    }

    // Update the Department
    const updatedDepartment = await prisma.department.update({
      where: { id: +id },
      data: { name, description, Banner, address, phone },
    });
    res.json(updatedDepartment);
  } catch (e) {
    next(e);
  }
});

router.post("/", authenticate, async (req, res, next) => {
  const { name, description, Banner, address, phone, profIds } = req.body;
  try {
    const professors = profIds.map((id) => ({ id }));
    const department = await prisma.department.create({
      data: {
        name,
        description,
        Banner,
        address,
        phone,
        Professors: { connect: professors },
      },
    });
    res.status(201).json(department);
  } catch (e) {
    next(e);
  }
});

router.delete("/:id", authenticate, async (req, res, next) => {
  const { id } = req.params;

  try {
    // Check if the department exists
    const department = await prisma.department.findUnique({
      where: { id: +id },
    });
    if (!department) {
      return next({
        status: 404,
        message: `department with id ${id} does not exist.`,
      });
    }
    await prisma.professor.updateMany({
      where: { DepartmentId: +id },
      data: { DepartmentId: null },
    });

    // Delete the department
    await prisma.department.delete({ where: { id: +id } });
    res.sendStatus(204);
  } catch (e) {
    next(e);
  }
});

module.exports = router;
