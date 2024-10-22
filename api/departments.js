const express = require("express");
const router = express.Router();

const { authenticate } = require("./auth");
const prisma = require("../prisma");

router.get("/", authenticate, async (req, res, next) => {
  try {
    const departments = await prisma.department.findMany({
      where: { ownerId: req.user.id },
      include: { Professors: true },
    });
    res.json(departments);
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
        ownerId: req.user.id,
        Professors: { connect: professors },
      },
    });
    res.status(201).json(department);
  } catch (e) {
    next(e);
  }
});
router.get("/:id", authenticate, async (req, res, next) => {
  const { id } = req.params;
  try {
    const order = await prisma.order.findUniqueOrThrow({
      where: { id: +id },
      include: { items: true },
    });
    if (order.ownerId !== req.user.id) {
      next({ status: 403, message: "You do not own this order." });
    }
    res.json(order);
  } catch (e) {
    next(e);
  }
});
module.exports = router;
