const mongoose = require("mongoose");

const campaignSchema = new mongoose.Schema(
  {
    name: String,
    pixelUrl: String,
    redirectUrl: String,
    actionType: {
      type: String,
      enum: ["pixel", "redirect", "both"],
      required: true,
    },
    offerPages: [String], // e.g., ["offer1", "offer2"]
  },
  { timestamps: true }
);

module.exports = mongoose.model("Campaign", campaignSchema);
