// Require the Mongoose package
const mongoose = require("mongoose");
const birdSchema = require("./bird.js");

//
const regionSchema = new mongoose.Schema({
  code: String,
  name: String,
  birds: [birdSchema],
});

// Export the schema as a Mongoose model.
// The Mongoose model will be accessed in `models/index.js`
module.exports = mongoose.model("Region", regionSchema);
