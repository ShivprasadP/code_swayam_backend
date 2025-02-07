const express = require("express");
const router = express.Router();
const Solution = require("../models/Solution");

// Add a solution route
router.post("/add", async (req, res) => {
  const newSolution = new Solution(req.body);
  try {
    const savedSolution = await newSolution.save();
    res.status(200).json(savedSolution);
  } catch (error) {
    res.status(500);
  }
});

// Get points by email route from all solutions
router.get("/:email", async (req, res) => {
  try {
    const solutions = await Solution.find({ email: req.params.email });
    const points = solutions.reduce(
      (acc, solution) => acc + solution.points,
      0
    );
    res.status(200).json(points);
  } catch (error) {
    res.status(400);
  }
});

// Get points of all students with their email route
router.get("/", async (req, res) => {
  try {
    const solutions = await Solution.find();
    const points = solutions.reduce((acc, solution) => {
      acc[solution.studentId] =
        (acc[solution.studentId] || 0) + solution.points;
      return acc;
    }, {});
    res.status(200).json(points);
  } catch (error) {
    res.status(400);
  }
});

// Delete a solution by email and problem statement ID route
router.delete("/:email/:problemStatementId", async (req, res) => {
  try {
    const solution = await Solution.findOneAndDelete({
      email: req.params.email,
      problemStatementId: req.params.problemStatementId,
    });

    if (!solution) {
      return res.status(404);
    }

    res.status(200).json(solution);
  } catch (error) {
    res.status(400);
  }
});

module.exports = router;
