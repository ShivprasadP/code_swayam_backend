const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  date: { type: Date, required: true },
  time: { type: String, required: true },
  venue: { type: String, required: true },
  organizer: { type: String, required: true }, // coordinator email
  contact: { type: String, required: true },
  category: { type: String, required: true },
  status: { type: Boolean, required: true },
  created_at: { type: Date, default: Date.now },
  instructor: { type: String },
  duration: { type: Number },
  fee: { type: Number },
});

const Event = mongoose.model("Event", eventSchema);
module.exports = Event;
