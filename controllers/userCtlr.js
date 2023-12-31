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
  const errorMessage =
    req.query.err === "unavailable"
      ? "Username has been taken. Please try again."
      : "";

  res.render("new-user", { errorMessage });
});

// login
router.post("/login", (req, res) => {
  const { userName, password } = req.body;
  db.User.findById(userName).then((user) => {
    // console.log("user", user);
    if (!user || user.password !== password) {
      res.render("custom-error", {
        title: "credentials not found",
        message: "Please check your login info",
      });
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
    { _id: userName },
    { $set: { userName: newUserName, profilePic: newProfilePic } },
    { new: true },
    (err, updatedUser) => {
      if (err) {
        console.error(err);
        res.render("custom-error", {
          title: "Unable to edit",
          message: "Please check your info",
        });
      } else {
        res.redirect("/user-profile");
      }
    }
  );
});

// Create user profile (POST request)
router.post("/user-profile", authMiddleware, async (req, res) => {
  try {
    const { userName = "", profilePic, password = "" } = req.body;
    const trimmedUserName = userName.trim();
    const foundUser = await db.User.findById(trimmedUserName);
    if (foundUser) {
      return res.redirect("/user/new?err=unavailable");
    }
    await db.User.create({ _id: trimmedUserName, profilePic, password });
    res.cookie("userName", trimmedUserName);
    res.redirect("/user/user-profile");
  } catch (err) {
    console.error(err);
    res.render("custom-error", {
      title: "Unable to Create Uer Profile",
      message: "Please check your info and try again.",
    });
  }
});

// get profile
router.get("/user-profile", authMiddleware, async (req, res) => {
  try {
    const user = req.user;
    if (!user) return res.redirect("/");
    const sightings = await db.Sighting.find({ user: user._id }).populate([
      "bird",
      "region",
    ]);
    console.log("user sightings", sightings);
    res.render("user-profile", { user, sightings });
  } catch (err) {
    console.error(err);
    res.render("custom-error", {
      title: "Profile not found",
      message: "Please check your info and try again",
    });
  }
});

/* Export these routes so that they are accessible in `server.js`
--------------------------------------------------------------- */
module.exports = router;
