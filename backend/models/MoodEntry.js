// backend/models/MoodEntry.js
const mongoose = require("mongoose");

const MoodEntrySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  mood: { type: Number, required: true }, // 1-5
  category: { type: String, default: "Mood" }, // optional: which category
  notes: { type: String },
  date: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model("MoodEntry", MoodEntrySchema);
