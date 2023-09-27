const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  _id: String,
  password: String,
  profilePic: {
    type: String,
    default:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfZCGFDrC8YeednlJC3mhxPfg_s4Pg8u7-kf6dy88&s",
  },
});

module.exports = mongoose.model("User", userSchema);
