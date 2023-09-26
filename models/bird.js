// Require the Mongoose package
const mongoose = require("mongoose");
const sightingSchema = require("./sighting.js");

// Create a schema to define the properties of the bird collection
const birdSchema = new mongoose.Schema({
  speciesCode: String,
  sciName: String,
  comName: String,
  familyComName: String,
  //   sightings: [sightingSchema],
});

// Export the schema as a Mongoose model.
// The Mongoose model will be accessed in `models/index.js`
module.exports = {
  model: mongoose.model("Bird", birdSchema),
  schema: birdSchema,
};
