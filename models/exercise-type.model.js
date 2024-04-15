const { Schema, model } = require("mongoose");

const exerciseType = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    advice: {
      type: String,
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
    type_session: {
      type: String,
      enum: ["Upper A", "Lower", "Upper B"],
      required: true,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const ExerciseType = model("ExerciseType", exerciseType);

module.exports = ExerciseType;
