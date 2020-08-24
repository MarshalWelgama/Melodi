const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  countryCode: { type: String, required: true },
  image: { type: String, required: false },
  link: { type: String, required: true },
});

module.exports = mongoose.model("User", userSchema);
