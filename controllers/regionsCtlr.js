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
  const regionsData = await db.Region.find()
    .sort({ name: 1 })
    .populate("birds");
  res.render("regions-index", {
    regions: regionsData,
  });
});

//Region byIds SHOW
//https://mongoosejs.com/docs/populate.html
router.get("/:id", async (req, res) => {
  try {
    const regionId = req.params.id;
    const familySearchTerm = req.query.familyComName;
    const region = await db.Region.findById(regionId).populate("birds");
    const uniqueFamilyComNames = [
      ...new Set(region.birds.map((bird) => bird.familyComName)),
    ];
    const displayBirds =
      familySearchTerm && uniqueFamilyComNames.includes(familySearchTerm)
        ? region.birds.filter((b) => b.familyComName === familySearchTerm)
        : region.birds;
    res.render("region-details", {
      region,
      birdData: displayBirds,
      uniqueFamilyComNames,
    });
  } catch (error) {
    console.error("error", error);
    res.redirect(404, "404");
  }
});

//Region sightings?

/* Export these routes so that they are accessible in `server.js`
--------------------------------------------------------------- */
module.exports = router;
