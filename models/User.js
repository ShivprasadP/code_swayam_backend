const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  full_name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone_number: { type: String, required: true },
  gender: { type: String, required: true, enum: ["Male", "Female", "Other"] },
  address: { type: String, required: true },
  password: { type: String, required: true },
  role: {
    type: String,
    required: true,
    enum: ["Student", "Faculty", "Admin"],
  },
  class: { type: String },
  div: { type: String },
  department: { type: String },
  designation: { type: String },
  coordinator_role: { type: Boolean },
});

const User = mongoose.model("User", userSchema);
module.exports = User;
