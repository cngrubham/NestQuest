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
  db.Sighting.find({}).then((sightings) => {
    res.render("sightings/sightings-index", { sightings });
  });
});

// TODO: Route: get "/:id"
router.get("/:id", async (req, res) => {
  try {
    const sightingInfo = await db.Sighting.findById(req.params.id).populate([
      "user",
      "region",
      "bird",
    ]);
    sightingInfo.user.password = null;
    res.render("sightings/sighting-details", sightingInfo);
  } catch (error) {
    console.log("error", error);
    res.redirect("404");
  }
});

// TODO: Show New sighting form: get "/new"

// TODO: Route: post "/"

// TODO: Show edit form: get "/:id/edit"

// TODO: Route: put "/:id"

// Destroy Route: DELETE localhost:3000/sightings/:id
router.delete("/:id", async (req, res) => {
  // TODO: stretch goal add more secure deletion
  db.Sighting.findByIdAndRemove(req.params.id)
    .then((result) => {
      console.log("deletion complete", result);
      res.redirect("/user/user-profile");
    })
    .catch((error) => {
      console.log("Deletion Error", error);
      res.redirect("/user/user-profile");
    });
});

/* Export these routes so that they are accessible in `server.js`
--------------------------------------------------------------- */
module.exports = router;
