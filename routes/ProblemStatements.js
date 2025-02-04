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
    res.send(savedProblemStatement);
  } catch (error) {
    res.send(error);
  }
});

// Get all Problem Statements route
router.get("/", async (req, res) => {
  try {
    const problemStatements = await ProblemStatement.find();
    res.send(problemStatements);
  } catch (error) {
    res.send(error);
  }
});

// Get a specific Problem Statement route
router.get("/:problemStatementId", async (req, res) => {
  try {
    const problemStatement = await ProblemStatement.findById(
      req.params.problemStatementId
    );
    res.send(problemStatement);
  } catch (error) {
    res.send(error);
  }
});

// Update Problem Statement route
router.put("/:problemStatementId", async (req, res) => {
  try {
    const updatedProblemStatement = await ProblemStatement.findById(
      req.params.problemStatementId
    );

    if (!updatedProblemStatement) {
      return res.status(404).send("Problem Statement not found");
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
    res.send(updatedProblemStatement);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Delete Problem Statement route
router.delete("/:problemStatementId", async (req, res) => {
  try {
    const removedProblemStatement = await ProblemStatement.findByIdAndDelete(
      req.params.problemStatementId
    );

    if (!removedProblemStatement) {
      return res.status(404).send("Problem Statement not found");
    }

    res.send(removedProblemStatement);
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
