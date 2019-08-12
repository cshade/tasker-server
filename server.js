'use strict'

var express = require('express')
var app = express()
var mongoose = require('mongoose')
var bodyParser = require('body-parser')
var taskRouter = require('./routes/tasks')
// configuration defined in config.js
var config = require('./config')
const cors = require('cors');
var path = require('path');

// Task and moment are here in server.js for seed data purposes
var Task = require('./models/task')
var moment = require('moment');

const connectDb = () => {
  return mongoose.connect(config.DATABASE_URL, {useNewUrlParser: true})
};

connectDb().then(async () => {
  if (config.START_DB_SEED) {
    console.log("found START_DB_CLEAN: now clearing database...");    
    await Task.deleteMany({});
  }
  seedDatabase();
});

// enable CORS
app.use(cors());

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

var PORT = config.APP_PORT || 8082
var HOST = config.HOST || '0.0.0.0'

connectDb().then(async () => {
  app.listen(PORT, HOST, () =>
    console.log(`Task API listening on http://${HOST}:${PORT}`),
  );
});

app.use('/api/task', taskRouter)
app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', `http://${HOST}:${PORT}`)
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE')
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type')
    // Pass to next layer of middleware
    next()
})

// Server index.html page when request to the root is made
app.get('/api', function (req, res, next) {
  var options = {
    root: path.join(__dirname, 'public'),
    dotfiles: 'deny',
    headers: {
      'x-timestamp': Date.now(),
      'x-sent': true
    }
  }
  res.sendFile('api-info.html', options, function (err) {
    if (err) { next(err) }
  })
})

// seed the database with data from the config file
const seedDatabase = async () => {
  if (config.START_DB_SEED) {
    // set due dates to recent dates, with a today and tomorrow
    let mySeeds = config.SEED_DATA;
    for (var key in mySeeds) {
      if (mySeeds.hasOwnProperty(key)) {
        if (mySeeds[key].name == config.SEED_DATA_TODAY_TASK) {
          mySeeds[key].due = moment()
        } else if (mySeeds[key].name == config.SEED_DATA_TOMORROW_TASK) {
          mySeeds[key].due = moment().add(1,'days')
        } else {
          mySeeds[key].due = moment().add(-2,'days')
        }
      }
    }

    console.log("found START_DB_SEED: now seeding database...");
    await Task.insertMany(mySeeds, (err, tasks) => {
      if (err) { console.log(err) }
    })
  }
};

module.exports = app;