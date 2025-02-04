const mongoose = require("mongoose");

const problemStatementSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  input: { type: String, required: true },
  output: { type: String, required: true },
  constraints: { type: String, required: true },
  sampleInput: { type: String, required: true },
  sampleOutput: { type: String, required: true },
  difficulty: { type: String, required: true },
  languages: { type: Array, required: true },
  rewardPoints: { type: Number, required: true },
});

const ProblemStatement = mongoose.model(
  "ProblemStatement",
  problemStatementSchema
);
module.exports = ProblemStatement;
