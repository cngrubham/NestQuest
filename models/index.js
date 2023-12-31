// Require the Mongoose package & your environment configuration
const mongoose = require("mongoose");
require("dotenv").config();

// Connect to MongoDB Atlas
mongoose.connect(process.env.MONGODBURI);
const db = mongoose.connection;

db.on("connected", function () {
  console.log(`Connected to MongoDB ${db.name} at ${db.host}:${db.port}`);
});

module.exports = {
  Bird: require("./bird"),
  seedBirds: require("./seeds/bird-seed"),
  seedRegions: require("./seeds/region-seed"),
  seedUsers: require("./seeds/user-seed"),
  seedSightings: require("./seeds/sighting-seed"),
  Sighting: require("./sighting"),
  User: require("./user"),
  Region: require("./region"),
};
