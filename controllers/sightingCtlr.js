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
  db.Sighting.find({})
    .sort({ dateAdded: -1 })
    .populate(["user", "region", "bird"])
    .then((sightingsList) => {
      console.log("check for user data", sightingsList[0]);
      res.render("sightings/sightings-index", { sightingsList });
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
    console.log("single sighting error", error);
    res.redirect("404");
  }
});

// TODO: Show New sighting form: get "/new"
router.get("/new/bird/:id", async (req, res) => {
  const user = req.user;
  if (!user) return res.redirect("403");
  const bird = await db.Bird.findById(req.params.id);
  const regionList = await db.Region.find({});
  res.render("sightings/new-sighting", { user, bird, regionList });
});

// TODO: Route: post "/"
router.post("/", (req, res) => {
  const user = req.user;
  console.log("sightings details body 1", req.body);
  req.body.user = user._id;
  console.log("sightings details body 2", req.body);
  db.Sighting.create(req.body).then((createdSighting) => {
    console.log("created sighting", createdSighting);
    res.redirect("/user/user-profile");
  });
});

// Show edit form: get "/:id/edit
router.get("/:id/edit", async (req, res) => {
  try {
    const sighting = await db.Sighting.findById(req.params.id).populate([
      "user",
      "region",
      "bird",
    ]);
    res.render("sightings/edit-sighting", { sighting });
  } catch (error) {
    console.log("Edit Error", error);
    res.redirect("/user/user-profile");
  }
});

// TODO: Route: put "/:id"
router.put("/:id", (req, res) => {
  db.Sighting.findByIdAndUpdate(req.params.id, req.body, { new: true }).then(
    (sighting) => {
      res.redirect("/user/user-profile");
    }
  );
});

// Destroy Route: DELETE localhost:3000/sightings/:id
router.delete("/:id", async (req, res) => {
  // TODO: stretch goal add more secure deletion
  db.Sighting.findByIdAndRemove(req.params.id)
    .then((result) => {
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
