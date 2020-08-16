const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  id: { type: String, required: true },
  user: { type: String, required: true },
  text: { type: String, required: true },
  song: { type: String, required: true },
  votes: { type: Number, required: true, default: 0 },
});

module.exports = mongoose.model("Comment", commentSchema);
