const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  _id: String,
  password: String,
  profilePic: {
    type: String,
    default:
      "",
  },
  // sightings: [{ type: mongoose.Schema.Types.ObjectId, ref: "Sighting" }],
});

module.exports = mongoose.model("User", userSchema);
