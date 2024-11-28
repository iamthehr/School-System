const express = require("express");
const Marks = require("../models/Marks");
const { verifyToken, authorizeRoles } = require("../middleware/auth");
const router = express.Router();

// View Own Marks
router.get(
  "/marks",
  verifyToken,
  authorizeRoles("Student"),
  async (req, res) => {
    try {
      const marks = await Marks.find();
      res.send(marks);
    } catch (err) {
      res.status(500).send(err.message);
    }
  }
);

module.exports = router;
