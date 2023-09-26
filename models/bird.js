// Require the Mongoose package
const mongoose = require("mongoose");
const sightingSchema = require("./sighting.js");

// Create a schema to define the properties of the bird collection
const birdSchema = new mongoose.Schema({
  _id: String,
  sciName: String,
  comName: String,
  category: String,
  taxonOrder: Number,
//   bandingCodes: [String],
//   comNameCodes: [String],
//   sciNameCodes: [String],
  order: String,
  familyCode: String,
  familyComName: String,
  familySciName: String,
//   sightings: [sightingSchema],
});

// Export the schema as a Mongoose model.
// The Mongoose model will be accessed in `models/index.js`
module.exports = mongoose.model("Bird", birdSchema);
