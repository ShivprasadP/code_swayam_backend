const express = require("express");
const router = express.Router();
const StudentRequest = require("../models/StudentRequest");

// Get all requests
router.get("/", async (req, res) => {
  try {
    const requests = await StudentRequest.find();
    res.json(requests);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add new request
router.post("/", async (req, res) => {
  const request = new StudentRequest({
    studentId: req.body.studentId,
    eventId: req.body.eventId,
    message: req.body.message,
  });

  try {
    const newRequest = await request.save();
    res.status(201).json(newRequest);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update request
router.patch("/:id", async (req, res) => {
  try {
    const request = await StudentRequest.findById(req.params.id);
    if (!request) {
      return res.status(404).json({ message: "Request not found" });
    }

    if (req.body.status != null) {
      request.status = req.body.status;
    }
    if (req.body.message != null) {
      request.message = req.body.message;
    }

    const updatedRequest = await request.save();
    res.json(updatedRequest);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete request
router.delete("/:id", async (req, res) => {
  try {
    const request = await StudentRequest.findById(req.params.id);
    if (!request) {
      return res.status(404).json({ message: "Request not found" });
    }

    await request.remove();
    res.json({ message: "Request deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
