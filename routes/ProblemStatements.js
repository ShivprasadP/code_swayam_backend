const express = require("express");
const router = express.Router();
const ProblemStatement = require("../models/ProblemStatement");

// Add Problem Statement route
router.post("/add", async (req, res) => {
  const problemStatement = new ProblemStatement({
    title: req.body.title,
    description: req.body.description,
    input: req.body.input,
    output: req.body.output,
    constraints: req.body.constraints,
    sampleInput: req.body.sampleInput,
    sampleOutput: req.body.sampleOutput,
    difficulty: req.body.difficulty,
    languages: req.body.languages,
    rewardPoints: req.body.rewardPoints,
  });

  try {
    const savedProblemStatement = await problemStatement.save();
    res.status(201).json(savedProblemStatement);
  } catch (error) {
    res.status(400);
  }
});

// Get all Problem Statements route
router.get("/", async (req, res) => {
  try {
    const problemStatements = await ProblemStatement.find();
    res.status(200).json(problemStatements);
  } catch (error) {
    res.status(400);
  }
});

// Get a specific Problem Statement route
router.get("/:problemStatementId", async (req, res) => {
  try {
    const problemStatement = await ProblemStatement.findById(
      req.params.problemStatementId
    );
    res.status(200).json(problemStatement);
  } catch (error) {
    res.status(400);
  }
});

// Get lanugauges of a specific Problem Statement route
router.get("/:problemStatementId/languages", async (req, res) => {
  try {
    const problemStatement = await ProblemStatement.findById(
      req.params.problemStatementId
    );
    res.status(200).json(problemStatement.languages);
  } catch (error) {
    res.status(400);
  }
});

// Update Problem Statement route
router.put("/:problemStatementId", async (req, res) => {
  try {
    const updatedProblemStatement = await ProblemStatement.findById(
      req.params.problemStatementId
    );

    if (!updatedProblemStatement) {
      return res.status(404);
    }

    updatedProblemStatement.title = req.body.title;
    updatedProblemStatement.description = req.body.description;
    updatedProblemStatement.input = req.body.input;
    updatedProblemStatement.output = req.body.output;
    updatedProblemStatement.constraints = req.body.constraints;
    updatedProblemStatement.sampleInput = req.body.sampleInput;
    updatedProblemStatement.sampleOutput = req.body.sampleOutput;
    updatedProblemStatement.difficulty = req.body.difficulty;
    updatedProblemStatement.languages = req.body.languages;
    updatedProblemStatement.rewardPoints = req.body.rewardPoints;

    await updatedProblemStatement.save();
    res.status(200).json(updatedProblemStatement);
  } catch (error) {
    res.status(400);
  }
});

// Delete Problem Statement route
router.delete("/:problemStatementId", async (req, res) => {
  try {
    const removedProblemStatement = await ProblemStatement.findByIdAndDelete(
      req.params.problemStatementId
    );

    if (!removedProblemStatement) {
      return res.status(404);
    }

    res.status(200).json(removedProblemStatement);
  } catch (error) {
    res.status(400);
  }
});

module.exports = router;
