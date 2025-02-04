const express = require("express");
const router = express.Router();
const Event = require("../models/Event");
const User = require("../models/User");
const EventRegistration = require("../models/EventRegistration");

// Add event registration route
router.post("/add", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).send("User not found");
    }

    const event = await Event.findById(req.body.eventId);
    if (!event) {
      return res.status(400).send("Event not found");
    }

    const eventRegistration = await EventRegistration.create(req.body);
    res.status(200).send(eventRegistration);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Get all event registrations route
router.get("/", async (req, res) => {
  try {
    const eventRegistrations = await EventRegistration.find();
    res.status(200).send(eventRegistrations);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Update event registration acceptance status
router.put("/update/:id", async (req, res) => {
  try {
    const eventRegistration = await EventRegistration.findById(req.params.id);
    if (!eventRegistration) {
      return res.status(404).send("Event registration not found");
    }

    eventRegistration.status = req.body.status;
    await eventRegistration.save();
    res.status(200).send(eventRegistration);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Get event registration by user id
router.get("/user/:email", async (req, res) => {
  try {
    const eventRegistrations = await EventRegistration.find({
      email: req.params.email,
    });
    res.status(200).send(eventRegistrations);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Get event registration by event id
router.get("/event/:eventId", async (req, res) => {
  try {
    const eventRegistrations = await EventRegistration.find({
      eventId: req.params.eventId,
    });
    res.status(200).send(eventRegistrations);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Get event registration by id
router.get("/:id", async (req, res) => {
  try {
    const eventRegistration = await EventRegistration.findById(req.params.id);
    res.status(200).send(eventRegistration);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Delete event registration by id
router.delete("/delete/:id", async (req, res) => {
  try {
    const eventRegistration = await EventRegistration.findByIdAndDelete(
      req.params.id
    );
    if (!eventRegistration) {
      return res.status(404).send("Event registration not found");
    }

    res.status(200).send("Event registration deleted");
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;
