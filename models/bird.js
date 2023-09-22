// Require the Mongoose package
const mongoose = require("mongoose");
const sightingSchema = require("./sighting.js");

// Create a schema to define the properties of the bird collection
const birdSchema = new mongoose.Schema({
    name: "string",
  sightings: [sightingSchema],
});

// Export the schema as a Monogoose model.
// The Mongoose model will be accessed in `models/index.js`
module.exports = mongoose.model("Bird", birdSchema);
