const express = require("express");
const router = express.Router();
const User = require("../models/User");

// Assign coordinator role to students or faculty route
router.put("/assign", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).send("User not found");
    }

    user.coordinator_role = req.body.coordinator_role;
    await user.save();
    res.send(user);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Get all coordinators route
router.get("/", async (req, res) => {
  try {
    const coordinators = await User.find({ coordinator_role: true });
    res.send(coordinators);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Remove coordinator role route
router.put("/remove", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).send("User not found");
    }

    user.coordinator_role = undefined;
    await user.save();
    res.send(user);
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
