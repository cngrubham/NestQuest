const mongoose = require("mongoose");
const sightingSchema = new mongoose.Schema({
  user: String,
  bird: String,
  region: String,
  dateAdded: { type: Date, default: Date.now },
});

module.exports = sightingSchema;
