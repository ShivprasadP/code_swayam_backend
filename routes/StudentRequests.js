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

// Get request whose status is pending
router.get("/pending", async (req, res) => {
  try {
    const requests = await StudentRequest.find({ status: "pending" });
    res.json(requests);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get request whose status is approved
router.get("/approved", async (req, res) => {
  try {
    const requests = await StudentRequest.find({ status: "approved" });
    res.json(requests);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get request whose status is rejected
router.get("/rejected", async (req, res) => {
  try {
    const requests = await StudentRequest.find({ status: "rejected" });
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

    const updatedRequest = await request.save();
    res.json(updatedRequest);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update status of all requests as status provided in request body
router.patch("/", async (req, res) => {
  try {
    const requests = await StudentRequest.updateMany(
      {},
      { $set: { status: req.body.status } }
    );
    res.json(requests);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete request
router.delete("/:id", async (req, res) => {
  try {
    const request = await StudentRequest.findByIdAndDelete(req.params.id);
    if (!request) {
      return res.status(404).json({ message: "Request not found" });
    }

    res.json({ message: "Request deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
