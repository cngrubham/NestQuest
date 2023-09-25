const mongoose = require("mongoose");
const sightingSchema = new mongoose.Schema({
  user: String,
  bird: String,
  region: String,
  picture: { type: String, default: "public/assets/imgs/bunting.png" }, //may need to change input type
  description: String,
  dateAdded: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Sighting", sightingSchema);
