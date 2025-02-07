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
    res.status(201).json(user);
  } catch (error) {
    res.status(400);
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
    });
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    res.status(400);
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
    res.status(201).json(user);
  } catch (error) {
    res.status(400);
  }
});

//login route
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (await bcrypt.compare(req.body.password, user.password)) {
      return res.status(200).json(user);
    } else {
      return res.status(400).json({ message: "Incorrect password" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
});

// Get all users who dont have admin role and coordinator role as true
router.get("/", async (req, res) => {
  try {
    const users = await User.find({
      role: { $ne: "admin" },
      coordinator_role: { $ne: true },
    });
    res.status(200).json(users);
  } catch (error) {
    res.status(400);
  }
});

// Get user by role
router.get("/role/:role", async (req, res) => {
  try {
    const users = await User.find({ role: req.params.role });
    res.status(200).json(users);
  } catch (error) {
    res.status(400);
  }
});

// Get user by id
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json(user);
  } catch (error) {
    res.status(400);
  }
});

// Update user by id
router.put("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).send({ error: "User not found" });
    }

    if (req.body.full_name) user.full_name = req.body.full_name;
    if (req.body.email) user.email = req.body.email;
    if (req.body.phone_number) user.phone_number = req.body.phone_number;
    if (req.body.gender) user.gender = req.body.gender;
    if (req.body.address) user.address = req.body.address;
    if (req.body.password)
      user.password = await bcrypt.hash(req.body.password, 10);
    if (req.body.role) user.role = req.body.role;
    if (req.body.class) user.class = req.body.class;
    if (req.body.div) user.div = req.body.div;
    if (req.body.department) user.department = req.body.department;
    if (req.body.designation) user.designation = req.body.designation;

    await user.save();
    res.status(200).json(user);
  } catch (error) {
    res.status(400).send({ error: "Something went wrong" });
  }
});

// Remove user by id
router.delete("/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    res.status(200).json(user);
  } catch (error) {
    res.status(400);
  }
});

module.exports = router;
