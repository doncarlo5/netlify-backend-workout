const { Schema, model } = require("mongoose");

const exerciseType = new Schema({
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ["bar", "free-weight", "cable", "machine"],
    required: true,
  },
  advice: {
    type: String,
    required: true,
  },
  timer: {
    type: Number,
    required: true,
  },
  repRange1: {
    type: String,
    required: true,
  },
  repRange2: {
    type: String,
    required: true,
  },
  repRange3: {
    type: String,
    required: true,
  },
});

// Create the Exercise model
const ExerciseType = model("ExerciseType", exerciseType);

module.exports = ExerciseType;
