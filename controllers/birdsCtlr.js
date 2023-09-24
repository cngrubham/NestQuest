/* Require modules
--------------------------------------------------------------- */
const express = require("express");
const router = express.Router();

/* Require the db connection, and models
--------------------------------------------------------------- */
const db = require("../models");

/* Routes
--------------------------------------------------------------- */
// //Index Route: display all birds
router.get("/bird-index", function (req, res) {
  db.Bird.find({})
    .then((birds) => {
      res.render("bird-index", { birds: birds });
    })
    .catch(() => res.send("404"));
});

//Show Route: display individual bird info
router.get("/:id", function (req, res) {
  const birdId = req.params.id;
  //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/all
  Promise.all([db.Bird.findById(birdId), db.Sighting.find({ bird: birdId })])
    .then(([bird, sightings]) => {
      console.log(sightings);
      res.render("bird-sightings", {
        bird,
        sightings,
      });
    })
    .catch(() => res.redirect("404"));
});

//Bird/:id/sightings
router.get("/:id/sightings", function (req, res) {
  const birdId = req.params.id;
  Promise.all([db.Bird.findById(birdId), db.Sighting.find({ bird: birdId })])
    .then(([bird, sightings]) => {
      res.render("bird-sightings", {
        bird,
        sightings,
      });
    })
    .catch(() => res.redirect("404"));
});

/* Export these routes so that they are accessible in `server.js`
--------------------------------------------------------------- */
module.exports = router;
