// backend/routes/mood.js
const express = require("express");
const MoodEntry = require("../models/MoodEntry");
const auth = require("../middleware/auth");

const router = express.Router();

// Save a mood entry (protected)
router.post("/", auth, async (req, res) => {
  try {
    const { mood, category, notes, date } = req.body;
    if (typeof mood !== "number") return res.status(400).json({ error: "mood (number) required" });

    const entry = await MoodEntry.create({
      userId: req.user.userId,
      mood,
      category,
      notes,
      date: date ? new Date(date) : undefined
    });

    res.json(entry);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// Get mood history for the current user (protected)
router.get("/", auth, async (req, res) => {
  try {
    const entries = await MoodEntry.find({ userId: req.user.userId }).sort({ date: -1 }).limit(500);
    res.json(entries);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;