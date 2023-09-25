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
// create account
router.get("/new", (req, res) => {
    res.render("new-user");
  });
// login
// update profile
// get profile
router.get("/user-profile", (req, res) => {
    res.render("user-profile");
  });

/* Export these routes so that they are accessible in `server.js`
--------------------------------------------------------------- */
module.exports = router;