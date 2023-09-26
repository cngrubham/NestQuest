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
  console.log("regionsData", regionsData[0].birds[0]);
  res.render("regions-index", { regions: regionsData });
});

//Region byIds SHOW
//https://mongoosejs.com/docs/populate.html
router.get("/:id", async (req, res) => {
  try {
    const regionId = req.params.id;
    const region = await db.Region.findOne({ code: regionId }).populate(
      "birds"
    );
    const birdSet = new Set();
    region.birds.forEach((bird) => birdSet.add(bird.familyComName));
    const uniqueFamilyComNames = [];
    birdSet.forEach((fam) => uniqueFamilyComNames.push(fam));
    console.log("uniqueFamilyComNames", uniqueFamilyComNames);
    res.render("region-details", {
      region,
      birdData: region.birds,
      uniqueFamilyComNames,
    });
  } catch (error) {
    res.redirect("404");
  }
});

//Region sightings?

/* Export these routes so that they are accessible in `server.js`
--------------------------------------------------------------- */
module.exports = router;
