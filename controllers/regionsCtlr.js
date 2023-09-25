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
router.get("/", async (req, res) => {
  const regionsData = await db.Region.find();
  console.log(db.Region)
  res.render("regions-index", { regions: regionsData });
});

//Region byIds SHOW
router.get("/:id", (req, res) => {
  const regionId = req.params.id;
  db.Region.findById(regionId).then((region) => {
    res.render("region-details", { region });
  });
});

//Region sightings?

/* Export these routes so that they are accessible in `server.js`
--------------------------------------------------------------- */
module.exports = router;
