// Requiring Mongoose
const mongoose = require("mongoose");

// CREATING SCHEMA TO USE THROUGHOUT APP
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
            },
            distance: {
                type: Number
            }
        }
    ]
},

{
    toJSON: {
        virtuals: true
    }
});
// CREATING THE VIRTUAL TO GET THE TOTAL DURATION OF THE WORKOUT
workoutSchema.virtual("totalDuration").get(function(){
    return this.exercises.reduce((sum, exercise) => {
        return sum + exercise.duration
    },0)
});

// EXPORTING WORKOUT
const Workout = mongoose.model("Workout", workoutSchema);

module.exports = Workout;