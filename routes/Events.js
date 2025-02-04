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
    });
    await event.save();
    res.status(201).send(event);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Get all events route
router.get("/", async (req, res) => {
  try {
    const events = await Event.find();
    res.send(events);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Get event by category route
router.get("/category/:category", async (req, res) => {
  try {
    const events = await Event.find({ category: req.params.category });
    res.send(events);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Get event by id route
router.get("/:id", async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    res.send(event);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Update event route
router.put("/update/:id", async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).send("Event not found");
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

    await event.save();
    res.send(event);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Delete event route
router.delete("/delete/:id", async (req, res) => {
  try {
    const event = await Event.findByIdAndDelete(req.params.id);
    if (!event) {
      return res.status(404).send("Event not found");
    }

    res.send(event);
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
