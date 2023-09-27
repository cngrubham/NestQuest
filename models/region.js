// Require the Mongoose package
const mongoose = require("mongoose");

//
const regionSchema = new mongoose.Schema({
  _id: String,
  name: String,
  birds: [{ type: String, ref: "Bird" }],
});

// Export the schema as a Mongoose model.
// The Mongoose model will be accessed in `models/index.js`
module.exports = mongoose.model("Region", regionSchema);
