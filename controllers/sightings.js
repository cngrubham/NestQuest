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
// Index Route (All sightings):
// GET sightings/
router.get("/", (req, res) => {
  db.Bird.find({}, { sightings: true, _id: false }).then((birds) => {
    // format query results to appear in one array,
    // rather than an array of objects containing arrays
    const flatList = [];
    for (let bird of birds) {
      flatList.push(...bird.sightings);
    }
    res.render("sightings/sightings-index", { sightings: flatList });
  });
});

router.get("/new/:birdId", async (req, res) => {
  const bird = await db.Bird.findById(req.params.birdId);
  res.render("sightings/new-form", { bird: bird });
});

// Create Route: POST sightings/
router.post("/create/:birdId", (req, res) => {
  db.Bird.findByIdAndUpdate(
    req.params.birdId,
    { $push: { sightings: req.body } },
    { new: true }
  ).then((bird) => res.redirect("/birds/" + bird._id));
});

// Show Route: GET sightings/:id
router.get("/:id", (req, res) => {
  db.Bird.findOne(
    { "sightings._id": req.params.id },
    { "sightings.$": true, _id: false }
  ).then((bird) => {
    // format query results to appear in one object,
    // rather than an object containing an array of one object
    res.render("sightings/sighting-details", { sightings: bird.sightings[0] });
  });
});

// Destroy Route: DELETE localhost:3000/sightings/:id
router.delete("/:id", (req, res) => {
  db.Bird.findOneAndUpdate(
    { "sightings._id": req.params.id },
    { $pull: { sightings: { _id: req.params.id } } },
    { new: true }
  ).then(() => res.redirect("/sightings"));
});

/* Export these routes so that they are accessible in `server.js`
--------------------------------------------------------------- */
module.exports = router;
