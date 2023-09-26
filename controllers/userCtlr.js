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
  console.log("body", req.body);
  const { userName, password } = req.body;
  db.User.findOne({ userName }).then((user) => {
    console.log("user", user);
    if (!user || user.password !== password) {
      res.render("404");
    } else {
      res.cookie("userName", userName);
      res.redirect("/regions");
    }
  });
});
// Logout Get
router.get("/logout", (req, res) => {
  //https://expressjs.com/en/api.html#res.clearCookie
  res.clearCookie("userName");
  res.redirect("/");
});
// update profile
router.get("/edit-user", authMiddleware, (req, res) => {
  res.render("edit-user");
});

// Update user profile (POST request)
router.post("/user-profile/edit", authMiddleware, (req, res) => {
  const { userName } = req.cookies;
  const { userName: newUserName, profilePic: newProfilePic } = req.body;

  db.User.findOneAndUpdate(
    { userName },
    { $set: { userName: newUserName, profilePic: newProfilePic } },
    { new: true },
    (err, updatedUser) => {
      if (err) {
        console.error(err);
        res.render("error");
      } else {
        res.redirect("/user-profile");
      }
    }
  );
});

// Create user profile (POST request)
router.post("/user-profile", authMiddleware, (req, res) => {
  const { userName, profilePic } = req.body;

  db.User.create({ userName, profilePic }, (err, newUser) => {
    if (err) {
      console.error(err);
      res.render("error");
    } else {
      res.redirect("/user-profile");
    }
  });
});

// get profile
router.get("/user-profile", authMiddleware, (req, res) => {
  res.render("user-profile");
});

/* Export these routes so that they are accessible in `server.js`
--------------------------------------------------------------- */
module.exports = router;
