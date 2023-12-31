const mongoose = require("mongoose");
const sightingSchema = new mongoose.Schema({
  user: { type: String, ref: "User" },
  bird: { type: String, ref: "Bird" },
  region: { type: String, ref: "Region" },
  picture: { type: String, default: "" },
  description: { type: String, default: "" },
  dateAdded: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Sighting", sightingSchema);
