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
    const uniqueFamilyComNames = [
      ...new Set(region.birds.map((bird) => bird.familyComName)),
    ];
    const birdData = region.birds.map((bird) => {
      return {
        sciName: bird.sciName,
        comName: bird.comName,
        familyComName: bird.familyComName,
      };
    });
    res.render("region-details", { region, birdData, uniqueFamilyComNames });
  } catch (error) {
    console.error(error);
    res.status(404).render("404");
  }
});

//Region sightings?

/* Export these routes so that they are accessible in `server.js`
--------------------------------------------------------------- */
module.exports = router;
