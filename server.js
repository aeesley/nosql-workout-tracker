// SERVER DEPENDENCIES
const express = require("express");
const mongoose = require("mongoose");
const logger = require("morgan");
const path = require("path");

// DESIGNATING THE PORT
const PORT = process.env.PORT || 3030

// CREATING INSTANCE OF EXPRESS APP
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb+srv://Alex:12345@workouttracker.d9ohy.mongodb.net/WorkoutTracker?retryWrites=true&w=majority", {
  useNewUrlParser: true,
  useFindAndModify: false
});

let WorkoutModel = require("./models/workout");
// ROUTES TO DISPLAY HTML PAGES

app.get("/", (req,res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
  });
  
  app.get("/exercise", (req,res) => {
      res.sendFile(path.join(__dirname, 'public', 'exercise.html'));
  });
  
  app.get("/stats", (req,res) => {
    res.sendFile(path.join(__dirname, 'public', 'stats.html'));
  });

// ROUTES TO MAKE APP FUNCTION
// Pulling all existing workout data from database to grab the last workout
  app.get("/api/workouts", (req,res) => {
    WorkoutModel.find({}).then(function(data) {
      res.json(data)
    })
  });

// Getting the last 7 workouts for stats
  app.get("/api/workouts/range", (req,res) => {
    WorkoutModel.find({}).limit(7).then(function(data) {
      res.json(data)
    })
  });

  // Creating a new blank exercise when user hits new workout
  app.post("/api/workouts", (req,res) => {
    WorkoutModel.create({exercises:[]}).then(function(data) {
      res.json(data)
    })
  });

  // Updating new workout with user input selections when creating new workout
  app.put("/api/workouts/:id", (req,res) => {
    WorkoutModel.findOneAndUpdate(
      { _id: req.params.id }, 
      { $push: {
          exercises: req.body
      }}
      ).then(function(data) {
      res.json(data)
    })

  });

// SHOWING WE ARE LISTENING ON PORT IN CONSOLE
  app.listen(PORT, () => {
    console.log(`App running on port ${PORT}!`);
  });


