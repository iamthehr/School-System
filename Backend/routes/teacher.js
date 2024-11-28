const express = require("express");
const Marks = require("../models/Marks");
const { verifyToken, authorizeRoles } = require("../middleware/auth");
const router = express.Router();

// Add Marks
router.post(
  "/marks",
  verifyToken,
  authorizeRoles("Teacher", "Admin"),
  async (req, res) => {
    const { studentName, subject, marks } = req.body;
    try {
      const record = new Marks({
        studentName,
        subject,
        marks,
        teacherId: req.user.id,
      });
      await record.save();
      res.status(201).send("Marks added successfully");
    } catch (err) {
      res.status(400).send(err.message);
    }
  }
);

// View Marks
router.get(
  "/marks",
  verifyToken,
  authorizeRoles("Teacher", "Admin"),
  async (req, res) => {
    try {
      const marks = await Marks.find().populate("studentName");
      res.send(marks);
    } catch (err) {
      res.status(500).send(err.message);
    }
  }
);

module.exports = router;
