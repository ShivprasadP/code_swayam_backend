const express = require("express");
const router = express.Router();
const Event = require("../models/Event");

// Add event route
router.post("/add", async (req, res) => {
  try {
    const event = new Event({
      title: req.body.title,
      description: req.body.description,
      date: req.body.date,
      time: req.body.time,
      venue: req.body.venue,
      organizer: req.body.organizer,
      contact: req.body.contact,
      category: req.body.category,
      status: req.body.status,
      instructor: req.body.instructor,
      duration: req.body.duration,
      fee: req.body.fee,
    });
    await event.save();
    res.status(201).json(event);
  } catch (error) {
    res.status(400);
  }
});

// Get all events route
router.get("/", async (req, res) => {
  try {
    const events = await Event.find();
    res.status(200).json(events);
  } catch (error) {
    res.status(400);
  }
});

// Get event by category route
router.get("/category/:category", async (req, res) => {
  try {
    const events = await Event.find({ category: req.params.category });
    res.status(200).json(events);
  } catch (error) {
    res.status(400);
  }
});

// Get event by id route
router.get("/:id", async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    res.status(200).json(event);
  } catch (error) {
    res.status(400);
  }
});

// Update event route
router.put("/update/:id", async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404);
    }

    event.title = req.body.title;
    event.description = req.body.description;
    event.date = req.body.date;
    event.time = req.body.time;
    event.venue = req.body.venue;
    event.organizer = req.body.organizer;
    event.contact = req.body.contact;
    event.category = req.body.category;
    event.status = req.body.status;
    event.instructor = req.body.instructor;
    event.duration = req.body.duration;
    event.fee = req.body.fee;

    await event.save();
    res.status(200).json(event);
  } catch (error) {
    res.status(400);
  }
});

// Delete event route
router.delete("/delete/:id", async (req, res) => {
  try {
    const event = await Event.findByIdAndDelete(req.params.id);
    if (!event) {
      return res.status(404);
    }

    res.status(200).json(event);
  } catch (error) {
    res.status(400);
  }
});

module.exports = router;
