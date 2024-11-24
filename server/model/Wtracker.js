//const { Collection, default: mongoose } = require("mongoose");

const mongoose = require("mongoose");

let workoutModel = mongoose.Schema(
  {
    date: String,
    exercise: String,
    sets: Number,
    reps: Number,
    weight: Number,
    focus: String,
  },
  {
    collection: "Workouts", // Name of your MongoDB collection
  }
);

module.exports = mongoose.model("Workouts", workoutModel);

