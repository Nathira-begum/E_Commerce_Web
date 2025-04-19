const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  provider: String,
});

module.exports = mongoose.model("User", userSchema);
