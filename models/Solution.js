const mongoose = require("mongoose");

const solutionSchema = new mongoose.Schema({
  problemStatementId: { type: String, required: true },
  studentId: { type: String, required: true },
  points: { type: Number, required: true },
});

const Solution = mongoose.model("Solution", solutionSchema);
module.exports = Solution;
