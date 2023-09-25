/* Require modules
--------------------------------------------------------------- */
require("dotenv").config();
const path = require("path");
const express = require("express");
const livereload = require("livereload");
const connectLiveReload = require("connect-livereload");
const methodOverride = require("method-override");

/* Require the db connection, models, and seed data
--------------------------------------------------------------- */
const db = require("./models");
const birds = require("./models/seeds/bird-seed");

/* Require the routes in the controllers folder
--------------------------------------------------------------- */
const birdsCtrl = require("./controllers/birdsCtlr");
const sightingsCtrl = require("./controllers/sightingCtlr");
const regionsCtrl = require("./controllers/regionsCtlr");
const userCtrl = require("./controllers/userCtlr");

/* Create the Express app
--------------------------------------------------------------- */
const app = express();

/* Configure the app to refresh the browser when nodemon restarts
--------------------------------------------------------------- */
const liveReloadServer = livereload.createServer();
liveReloadServer.server.once("connection", () => {
  // wait for nodemon to fully restart before refreshing the page
  setTimeout(() => {
    liveReloadServer.refresh("/");
  }, 100);
});

/* Configure the app (app.set)
--------------------------------------------------------------- */
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

/* Middleware (app.use)
--------------------------------------------------------------- */
app.use(express.static("public"));
app.use(connectLiveReload());
app.use("/imgs", express.static("imgs"));
// Body parser: used for POST/PUT/PATCH routes:
// this will take incoming strings from the body that are URL encoded and parse them
// into an object that can be accessed in the request parameter as a property called body (req.body).
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

/* Mount routes
--------------------------------------------------------------- */
app.get("/", function (req, res) {
  res.render("home");
});

// When a GET request is sent to `/seed`, the birds collection is seeded
app.get("/seed", function (req, res) {
  // Remove any existing birds list
  const delPromises = [
    // db.Region.deleteMany({}),
    db.Bird.deleteMany({}),
    db.Sighting.deleteMany({}),
    db.User.deleteMany({}),
  ];
  Promise.all(delPromises).then((listsOfRemovedItems) => {
    const insertPromises = [
      //   db.Region.insertMany(db.seedRegions),
      db.Bird.insertMany(db.seedBirds),
      db.Sighting.insertMany(db.seedSightings),
      db.User.insertMany(db.seedUsers),
    ];
    Promise.all(insertPromises).then((listsOfInserted) => {
      res.send("Database seeded");
    });
  });
});

// This tells our app to look at the `controllers/birds.js` file
// to handle all routes that begin with `localhost:3000/books`
app.use("/birds", birdsCtrl);
app.use("/sightings", sightingsCtrl);
app.use("/regions", regionsCtrl);
app.use("/user", userCtrl);

// The "catch-all" route: Runs for any other URL that doesn't match the above routes
//must go below all other routes including app.use
app.get("*", function (req, res) {
  res.render("404");
});
/* Tell the app to listen on the specified port
--------------------------------------------------------------- */
app.listen(process.env.PORT, function () {
  console.log("Express is listening to port", process.env.PORT);
});
