const express = require("express");
const router = express.Router();
const User = require("../models/User");

// Assign coordinator role to students or faculty route
router.put("/assign", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404);
    }

    user.coordinator_role = req.body.coordinator_role;
    await user.save();
    res.status(200).json(user);
  } catch (error) {
    res.status(400);
  }
});

// Get all coordinators route
router.get("/", async (req, res) => {
  try {
    const coordinators = await User.find({ coordinator_role: true });
    res.status(200).json(coordinators);
  } catch (error) {
    res.status(400);
  }
});

// Remove coordinator role route
router.put("/remove", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404);
    }

    user.coordinator_role = undefined;
    await user.save();
    res.status(200).json(user);
  } catch (error) {
    res.status(400);
  }
});

module.exports = router;
