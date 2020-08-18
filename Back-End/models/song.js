const mongoose = require("mongoose");

const songSchema = new mongoose.Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  albumArt: { type: String, required: true },
  previewURL: { type: String, required: false },
  comments: { type: Array, required: true, default: [] },
});

module.exports = mongoose.model("Song", songSchema);
