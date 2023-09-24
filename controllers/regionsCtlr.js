/* Require modules
--------------------------------------------------------------- */
const express = require("express");
// Router allows us to handle routing outside of server.js
const router = express.Router();

/* Require the db connection, and models
--------------------------------------------------------------- */
const db = require("../models");

/* Routes
--------------------------------------------------------------- */
//All regions
router.get("/test", (req, res) => {
  res.send("Test Successful");
});

//Region byIds

//Region sightings

/* Export these routes so that they are accessible in `server.js`
--------------------------------------------------------------- */
module.exports = router;
