const express = require("express");
const router = express.Router();
const Solution = require("../models/Solution");
const ProblemStatements = require("../models/ProblemStatement");

// Add a solution route
router.post("/add", async (req, res) => {
  const newSolution = new Solution(req.body);
  try {
    const savedSolution = await newSolution.save();
    res.status(200).send(savedSolution);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Get all solutions route
router.get("/", async (req, res) => {
  try {
    const solutions = await Solution.find();
    res.status(200).send(solutions);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Get a solution by id route
router.get("/:id", async (req, res) => {
  try {
    const solution = await Solution.findById(req.params.id);
    res.status(200).send(solution);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Get solutions for a specific problem statement route
router.get("/problem/:problemStatementId", async (req, res) => {
  try {
    const solutions = await Solution.find({
      problemStatementId: req.params.problemStatementId,
    });
    res.status(200).send(solutions);
  } catch (error) {
    res.status(500).send(error);
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
      return res.status(404).send("Solution not found");
    }

    solution.solution = req.body.solution;
    solution.points = req.body.points;

    await solution.save();
    res.status(200).send(solution);
  } catch (error) {
    res.status(400).send(error);
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
      return res.status(404).send("Solution not found");
    }

    res.status(200).send(solution);
  } catch (error) {
    res.status(400).send(error);
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
    res.status(200).send(points);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Get the points of a specific student for each problem statement
router.get("/points/student/:email", async (req, res) => {
  try {
    const solutions = await Solution.find({ email: req.params.email });

    if (!solutions.length) {
      return res
        .status(404)
        .json({ message: "No solutions found for this student" });
    }

    const result = solutions.map((solution) => ({
      problemStatementId: solution.problemStatementId,
      points: solution.points,
    }));

    res.status(200).json({ email: req.params.email, results: result });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error });
  }
});

// Get the total points of a specific student
router.get("/points/total/:email", async (req, res) => {
  try {
    const solutions = await Solution.find({ email: req.params.email });

    if (!solutions.length) {
      return res
        .status(404)
        .json({ message: "No solutions found for this student" });
    }

    const totalPoints = solutions.reduce(
      (acc, solution) => acc + (solution.points || 0),
      0
    );

    res.status(200).json({ email: req.params.email, totalPoints });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error });
  }
});

module.exports = router;
