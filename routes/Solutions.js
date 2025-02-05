const express = require("express");
const router = express.Router();
const Solution = require("../models/Solution");
const ProblemStatements = require("../models/ProblemStatement");

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

// Get all solutions route
router.get("/", async (req, res) => {
  try {
    const solutions = await Solution.find();
    res.status(200).json(solutions);
  } catch (error) {
    res.status(500);
  }
});

// Get a solution by id route
router.get("/:id", async (req, res) => {
  try {
    const solution = await Solution.findById(req.params.id);
    res.status(200).json(solution);
  } catch (error) {
    res.status(500);
  }
});

// Get solutions for a specific problem statement route
router.get("/problem/:problemStatementId", async (req, res) => {
  try {
    const solutions = await Solution.find({
      problemStatementId: req.params.problemStatementId,
    });
    res.status(200).json(solutions);
  } catch (error) {
    res.status(500);
  }
});

// Update a solution by email and problem statement ID route
router.put("/:email/:problemStatementId", async (req, res) => {
  try {
    const solution = await Solution.findOne({
      email: req.params.email,
      problemStatementId: req.params.problemStatementId,
    });

    if (!solution) {
      return res.status(404);
    }

    solution.solution = req.body.solution;
    solution.points = req.body.points;

    await solution.save();
    res.status(200).json(solution);
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

// Get the points of all students for specific problem statement and sort them in descending order
router.get("/points/:problemStatementId", async (req, res) => {
  try {
    const solutions = await Solution.find({
      problemStatementId: req.params.problemStatementId,
    });
    const points = solutions.map((solution) => {
      return {
        email: solution.email,
        points: solution.points,
      };
    });
    points.sort((a, b) => b.points - a.points);
    res.status(200).json(points);
  } catch (error) {
    res.status(500);
  }
});

// Get the points of a specific student for each problem statement
router.get("/points/student/:email", async (req, res) => {
  try {
    const solutions = await Solution.find({ email: req.params.email });

    if (!solutions.length) {
      return res.status(404);
    }

    const result = solutions.map((solution) => ({
      problemStatementId: solution.problemStatementId,
      points: solution.points,
    }));

    res.status(200).json({ email: req.params.email, results: result });
  } catch (error) {
    res.status(500);
  }
});

// Get the total points of a specific student
router.get("/points/total/:email", async (req, res) => {
  try {
    const solutions = await Solution.find({ email: req.params.email });

    if (!solutions.length) {
      return res.status(404);
    }

    const totalPoints = solutions.reduce(
      (acc, solution) => acc + (solution.points || 0),
      0
    );

    res.status(200).json({ email: req.params.email, totalPoints });
  } catch (error) {
    res.status(500);
  }
});

module.exports = router;
