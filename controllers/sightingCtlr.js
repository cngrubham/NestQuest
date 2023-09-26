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

// New Route: Get sightings/
router.get("/new/:birdId", async (req, res) => {
  const bird = await db.Bird.findById(req.params.birdId);
  res.render("sightings/new-sighting", { bird: bird });
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
  //need to query sightings to be specific to user
  db.Bird.findOne(
    { "sightings._id": req.params.id },
    { "sightings.$": true, _id: false }
  ).then((bird) => {
    // format query results to appear in one object,
    // rather than an object containing an array of one object
    res.render("sightings/sightings-index", { sightings: bird.sightings[0] });
  });
});
// Edit Sighting Route (GET/Read)
router.get("/sighting/:id/edit", (req, res) => {
  db.Bird.findOne(
    { "sightings._id": req.params.id },
    { "sightings.$": true, _id: false }
  ).then((bird) => {
    if (bird && bird.sightings && bird.sightings.length > 0) {
      const sighting = bird.sightings[0];
      res.render("/sightings/edit-sighting", { sighting: sighting });
    } else {
      res.status(404).send("Sighting not found.");
    }
  });
});
// Update Route (PUT/Update): This route receives the PUT request sent from the edit route
router.put("/sightings/:id", (req, res) => {
  db.Bird.findByIdAndUpdate(req.params.id, req.body, { new: true }).then(
    (bird) => res.redirect("/sightings/" + bird._id)
  );
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
