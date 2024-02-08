const { Schema, model } = require("mongoose");

// Define the Exercise schema
const exerciseSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ["bar", "free-weight", "cable", "machine"],
    },
    image: {
      type: String,
      default:
        "https://toppng.com/uploads/preview/weights-svg-vector-weightlifting-icon-11553466117vxf3vpx9io.png",
    },
    series: {
      type: Number,
      required: true,
    },
    repetitions: {
      type: Number,
      required: true,
    },
    advice: {
      type: String,
    },
    // comment: {
    //   type: String,
    // } create as a new model,
    timer: {
      type: Number,
      required: true,
    },
    session_index: {
      type: Number,
      enum: [1, 2, 3],
      required: true,
    },
  },
  {
    timestamps: true, // Adds `createdAt` and `updatedAt` properties
  }
);

// Create the Exercise model
const Exercise = model("Exercise", exerciseSchema);

module.exports = Exercise;
