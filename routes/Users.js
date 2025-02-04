const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

// Add Admin route
router.post("/reg/admin", async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const user = new User({
      full_name: req.body.full_name,
      email: req.body.email,
      phone_number: req.body.phone_number,
      gender: req.body.gender,
      address: req.body.address,
      password: hashedPassword,
      role: req.body.role,
    });
    await user.save();
    res.status(201).send(user);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Add faculty route
router.post("/register/faculty", async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const user = new User({
      full_name: req.body.full_name,
      email: req.body.email,
      phone_number: req.body.phone_number,
      gender: req.body.gender,
      address: req.body.address,
      password: hashedPassword,
      role: req.body.role,
      department: req.body.department,
      designation: req.body.designation,
      faculty_role: req.body.faculty_role,
    });
    await user.save();
    res.status(201).send(user);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Add student route
router.post("/register/student", async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const user = new User({
      full_name: req.body.full_name,
      email: req.body.email,
      phone_number: req.body.phone_number,
      gender: req.body.gender,
      address: req.body.address,
      password: hashedPassword,
      role: req.body.role,
      class: req.body.class,
      div: req.body.div,
      department: req.body.department,
    });
    await user.save();
    res.status(201).send(user);
  } catch (error) {
    res.status(400).send(error);
  }
});

//login route
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).send("User not found");
    }

    if (await bcrypt.compare(req.body.password, user.password)) {
      return res.send(user);
    } else {
      return res.send("Login failed");
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
