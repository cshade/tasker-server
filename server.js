"use strict";

var express = require("express");
var app = express();
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var taskRouter = require("./routes/tasks");
var reminderRouter = require("./routes/reminders");
// configuration defined in config.js
var config = require("./config");
const cors = require("cors");
var path = require("path");

// Task and moment are here in server.js for seed data purposes
var Task = require("./models/task");
var Reminder = require("./models/reminder");
var moment = require("moment");

const connectDb = () => {
  console.log(
    `NODE_ENV = ${process.env.NODE_ENV} | DATABASE_URL = ${config.DATABASE_URL}`
  );
  return mongoose.connect(config.DATABASE_URL, {
    poolSize: config.CONNECTION_POOL_SIZE,
    wtimeout: 2500,
    useNewUrlParser: true,
    autoIndex: false
  });
};

connectDb().then(async () => {
  console.log(`config.START_DB_CLEAN = ${config.START_DB_CLEAN}`);
  if (config.START_DB_CLEAN) {
    console.log("server.js START_DB_CLEAN: Clearing database...");
    try {
      await Task.deleteMany({});
      await Reminder.deleteMany({});
      // await mongoose.connection.collections[
      //     'tasks', 'reminders'
      //   ]
      //   .drop( () => {
      //     console.log(`MongoDB collections _tasks_ and _reminders_ are dropped`);
      //   });
    } catch (err) {
      console.log(`Error trying to clear database: ${err}`);
    }
  }
  seedDatabase();
});

// enable CORS
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var PORT = config.APP_PORT || 8082;
var HOST = config.HOST || "localhost";

connectDb().then(async () => {
  app.listen(PORT, HOST, () =>
    console.log(`Task API listening on http://${HOST}:${PORT}`)
  );
});

app.use(express.static("public"));
app.use(express.static("tests"));

app.use("/api/task", taskRouter);

app.use("/api/reminder", reminderRouter);

app.use(function(req, res, next) {
  // Website you wish to allow to connect
  res.setHeader("Access-Control-Allow-Origin", `http://${HOST}:${PORT}`);
  // Request methods you wish to allow
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  // Request headers you wish to allow
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );
  // Pass to next layer of middleware
  next();
});

// Server index.html page when request to the root is made
app.get("/api", function(req, res, next) {
  var options = {
    root: path.join(__dirname, "public"),
    dotfiles: "deny",
    headers: {
      "x-timestamp": Date.now(),
      "x-sent": true
    }
  };
  res.sendFile("api-info.html", options, err => {
    if (err) {
      next(err);
    }
  });
});

// seed the database with data from the config file
const seedDatabase = async () => {
  console.log(`config.START_DB_SEED = ${config.START_DB_SEED}`);
  if (config.START_DB_SEED) {
    // Task Data
    // set due dates to recent dates, with a today and tomorrow
    let myTaskSeeds = config.SEED_DATA_TASK;
    for (var key in myTaskSeeds) {
      if (myTaskSeeds[key].name == config.SEED_DATA_TODAY_TASK) {
        myTaskSeeds[key].due = moment();
      } else if (myTaskSeeds[key].name == config.SEED_DATA_TOMORROW_TASK) {
        console.log(
          `Setting task due tomorrow: ${config.SEED_DATA_TOMORROW_TASK}`
        );
        myTaskSeeds[key].due = moment().add(1, "days");
      } else {
        console.log(
          `Setting task due 2 days ago: ${config.SEED_DATA_TOMORROW_TASK}`
        );
        myTaskSeeds[key].due = moment().add(-2, "days");
      }
    }

    await Task.insertMany(myTaskSeeds, err => {
      if (err) {
        console.log(err);
      }
    });

    // Reminder Data
    // set due dates to recent dates, with a today and tomorrow
    let myReminderSeeds = config.SEED_DATA_REMINDER;
    await Reminder.insertMany(myReminderSeeds, err => {
      if (err) {
        console.log(err);
      }

      console.log("server.js START_DB_SEED: seeded db with initial data");
    });
  }
};

module.exports = app;
