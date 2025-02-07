const mongoose = require("mongoose");

const testCaseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  input: { type: String, required: true },
  expected_output: { type: String, required: true },
  problemStatementId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ProblemStatement",
    required: true,
  },
});

const TestCase = mongoose.model("TestCase", testCaseSchema);
module.exports = TestCase;
