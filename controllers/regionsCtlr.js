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
//All regions GET
router.get("/", (req, res) => {
  Region.find().then((regions) => {
    res.render("regions-index", { regions });
  });
});

//Region byIds
router.get("/", (req, res) => {
  res.render();
});

//Region sightings

/* Export these routes so that they are accessible in `server.js`
--------------------------------------------------------------- */
module.exports = router;
