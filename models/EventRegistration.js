const mongoose = require("mongoose");

const eventRegistrationSchema = new mongoose.Schema({
  email: { type: String, required: true },
  eventId: { type: String, required: true },
  status: {
    type: String,
    enum: ["Pending", "Accepted", "Rejected"],
    default: "Pending",
  },
  created_at: { type: Date, default: Date.now },
});

const EventRegistration = mongoose.model(
  "EventRegistration",
  eventRegistrationSchema
);

module.exports = EventRegistration;
