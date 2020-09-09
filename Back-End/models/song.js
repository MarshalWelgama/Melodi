const mongoose = require("mongoose");

const songSchema = new mongoose.Schema({
  songId: { type: String, required: true },
  songName: { type: String, required: true },
  artistsName: { type: Array, required: true },
  albumName: { type: String, required: true },
  albumArt: { type: String, required: true },
  previewURL: { type: String, required: false },
  comments: { type: Array, required: true, default: [] },
});

module.exports = mongoose.model("Song", songSchema);
