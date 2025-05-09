const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: String,
  mobileNo: { type: String, required: true },
  dob: { type: String, required: true },
  location: String,
  
  income: String,
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);
