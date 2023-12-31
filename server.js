/* Require modules
--------------------------------------------------------------- */
require("dotenv").config();
const path = require("path");
const express = require("express");
const livereload = require("livereload");
const methodOverride = require("method-override");
// https://www.freecodecamp.org/news/authenticate-users-node-app/
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
/* Create the Express app
--------------------------------------------------------------- */
const app = express();

const connectLiveReload = require("connect-livereload");
// Detect if running in a dev environment
if (process.env.ON_HEROKU === "false") {
  // Configure the app to refresh the browser when nodemon restarts
  const liveReloadServer = livereload.createServer({ port: 35730 });
  liveReloadServer.server.once("connection", () => {
    // wait for nodemon to fully restart before refreshing the page
    setTimeout(() => {
      liveReloadServer.refresh("/");
    }, 100);
  });
  app.use(connectLiveReload());
}

// Body parser: used for POST/PUT/PATCH routes:
// this will take incoming strings from the body that are URL encoded and parse them
// into an object that can be accessed in the request parameter as a property called body (req.body).
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
// Allows us to interpret POST requests from the browser as another request type: DELETE, PUT, etc.
app.use(methodOverride("_method"));

/* Require the db connection, models, and seed data
--------------------------------------------------------------- */
const db = require("./models");

/* Require the routes in the controllers folder
--------------------------------------------------------------- */
const birdsCtrl = require("./controllers/birdsCtlr");
const sightingsCtrl = require("./controllers/sightingCtlr");
const regionsCtrl = require("./controllers/regionsCtlr");
const userCtrl = require("./controllers/userCtlr");
const authMiddleware = require("./middleware/auth");

/* Attach db to app
--------------------------------------------------------------- */
app.set("db", db);

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
// const publicPath = path.join(__dirname, "/public");
// console.log(publicPath);
// app.use(express.static());
app.use("/public", express.static("public"));
// app.use(express.static(path.join(__dirname, "/public")));

// app.use(connectLiveReload());
app.use("/imgs", express.static("imgs"));
// Body parser: used for POST/PUT/PATCH routes:
// this will take incoming strings from the body that are URL encoded and parse them
// into an object that can be accessed in the request parameter as a property called body (req.body).
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(cookieParser());

/* Mount routes
--------------------------------------------------------------- */
app.get("/", authMiddleware, function (req, res) {
  res.render("home");
});

// When a GET request is sent to `/seed`, the birds collection is seeded
app.get("/seed", async function (req, res) {
  // Remove any existing birds list
  const deletionPromises = [
    // db.Bird.deleteMany({}),
    // db.Sighting.deleteMany({}),
    // db.User.deleteMany({}),
    // db.Region.deleteMany({}),
  ];
  const listsOfRemovedItems = await Promise.all(deletionPromises);
  listsOfRemovedItems.forEach((collection) => {
    console.log(`Removed items`, collection);
  });

  // insert seed data
  const insertPromises = [
    // db.Bird.insertMany(db.seedBirds),
    // db.Sighting.insertMany(db.seedSightings),
    // db.User.insertMany(db.seedUsers),
    // db.Region.insertMany(db.seedRegions),
  ];
  Promise.all(insertPromises).then((listsOfInserted) => {
    listsOfInserted.forEach((collection) => {
      console.log(`Inserted ${collection.length} items`);
    });
    res.send("Database seeded");
  });
});

// This tells our app to look at the `controllers/birds.js` file
// to handle all routes that begin with `localhost:3000/books`
app.use("/birds", authMiddleware, birdsCtrl);
app.use("/sightings", authMiddleware, sightingsCtrl);
app.use("/regions", authMiddleware, regionsCtrl);
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
