/* Require modules
--------------------------------------------------------------- */
const express = require("express");
// Router allows us to handle routing outside of server.js
const router = express.Router();

/* Require the db connection, and models
--------------------------------------------------------------- */
const db = require("../models");
const authMiddleware = require("../middleware/auth");

/* Routes
--------------------------------------------------------------- */
// create account
router.get("/new", (req, res) => {
  res.render("new-user");
});
// login
router.post("/login", (req, res) => {
  const { userName, password } = req.body;
  db.User.findOne({ userName }).then((user) => {
    if (!user || user.password !== password) {
      res.render("404");
    } else {
      res.cookie("userName", userName);
      res.redirect("/regions-index");
    }
  });
});
// Logout Get
router.get("/logout", (req, res) => {
  //https://expressjs.com/en/api.html#res.clearCookie
  res.clearCookie("userName");
  // res.set("userName", { expires: Date.now() });
  res.redirect("/");
});
// update profile

// post profile

// get profile
router.get("/user-profile", authMiddleware, (req, res) => {
  res.render("user-profile");
});

/* Export these routes so that they are accessible in `server.js`
--------------------------------------------------------------- */
module.exports = router;
