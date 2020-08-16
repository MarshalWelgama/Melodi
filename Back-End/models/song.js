const mongoose = require("mongoose");

const songSchema = new mongoose.Schema({
  name: { type: String, required: true },
  albumArt: { type: String, required: true },
  comments: { type: Array, required: true, default: [] },
});

module.exports = mongoose.model("Song", songSchema);
