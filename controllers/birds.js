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
// router.get("/", function (req, res) {
//   db.Bird.find({}).then((birds) => res.render("bird-index", { birds: birds }));
// });
// bird-index route: display all birds
router.get("/bird-index", function (req, res) {
  db.Bird.find({})
    .then((birds) => {
      res.render("bird-index", { birds: birds });
    })
    .catch(() => res.send("404 Error: Page Not Found"));
});

//Show Route: display individual bird info
router.get("/:id", function (req, res) {
  db.Bird.findById(req.params.id)
    .then((bird) => {
      res.render("bird-details", {
        bird: bird,
      });
    })
    .catch(() => res.send("404 Error: Page Not Found"));
});

/* Export these routes so that they are accessible in `server.js`
--------------------------------------------------------------- */
module.exports = router;
