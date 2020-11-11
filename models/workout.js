// Requiring Mongoose
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const workoutSchema = new Schema({
    day: {
        type: Date,
        default: Date.now
    },
    exercises: [
        {
            type: {
                type: String,
                trim: true,
                required: "Exercise Type"
            },
            name: {
                type: String,
                trim: true,
                required: "Exercise Name"
            },
            duration: {
                type: Number,
                required: "Exercise Duration (Minutes)"
            },
            weight: {
                type: Number
            },
            reps: {
                type: Number
            },
            sets: {
                type: Number
            }
        }
    ]
})

const Workout = mongoose.model("Workout", workoutSchema);

module.exports = Workout;