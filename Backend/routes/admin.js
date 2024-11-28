const express = require("express");
const User = require("../models/User");
const { verifyToken, authorizeRoles } = require("../middleware/auth");
const router = express.Router();

// Approve User
router.put(
  "/approve/:id",
  verifyToken,
  authorizeRoles("Admin"),
  async (req, res) => {
    try {
      const user = await User.findByIdAndUpdate(
        req.params.id,
        { isApproved: true },
        { new: true }
      );
      res.send(user);
    } catch (err) {
      res.status(400).send(err.message);
    }
  }
);

// Disable User
router.put(
  "/disable/:id",
  verifyToken,
  authorizeRoles("Admin"),
  async (req, res) => {
    try {
      const user = await User.findByIdAndUpdate(
        req.params.id,
        { isActive: false },
        { new: true }
      );
      res.send(user);
    } catch (err) {
      res.status(400).send(err.message);
    }
  }
);

// List All Users
router.get("/users", verifyToken, authorizeRoles("Admin"), async (req, res) => {
  try {
    const users = await User.find();
    res.send(users);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = router;
