const mongoose = require("mongoose");

const solutionSchema = new mongoose.Schema({
  problemStatementId: { type: String, required: true },
  email: { type: String, required: true },
  solution: { type: String, required: true },
  points: { type: Number, required: true },
});

const Solution = mongoose.model("Solution", solutionSchema);
module.exports = Solution;
