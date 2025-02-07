const express = require("express");
const router = express.Router();
const TestCase = require("../models/TestCase");

// Add test case route
router.post("/add", async (req, res) => {
  try {
    const testCase = new TestCase({
      title: req.body.title,
      input: req.body.input,
      expected_output: req.body.expected_output,
      problemStatementId: req.body.problemStatementId,
    });
    await testCase.save();
    res.status(201).json(testCase);
  } catch (error) {
    res.status(400);
  }
});

// Get all test cases route
router.get("/", async (req, res) => {
  try {
    const testCases = await TestCase.find();
    res.status(200).json(testCases);
  } catch (error) {
    res.status(400);
  }
});

// Get test case by problem statement id route
router.get("/:problemStatementId", async (req, res) => {
  try {
    const testCases = await TestCase.find({
      problemStatementId: req.params.problemStatementId,
    });
    res.status(200).json(testCases);
  } catch (error) {
    res.status(400);
  }
});

// Get test case by id route
router.get("/:id", async (req, res) => {
  try {
    const testCase = await TestCase.findById(req.params.id);
    res.status(200).json(testCase);
  } catch (error) {
    res.status(400);
  }
});

// Update test case route
router.put("/update/:id", async (req, res) => {
  try {
    const testCase = await TestCase.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json(testCase);
  } catch (error) {
    res.status(400);
  }
});

// Delete test case route
router.delete("/delete/:id", async (req, res) => {
  try {
    await TestCase.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Test case deleted successfully" });
  } catch (error) {
    res.status(400);
  }
});

module.exports = router;
