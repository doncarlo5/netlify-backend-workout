const { Schema, model } = require("mongoose");

const exerciseUserSchema = new Schema(
  {
    date: {
      type: Date,
      required: [true, "Date is required."],
    },
    type: {
      type: Schema.Types.ObjectId,
      ref: "ExerciseType",
    },
    weight: { type: [Number], required: true },
    rep: { type: [Number], required: true },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const ExerciseUser = model("ExerciseUser", exerciseUserSchema);

module.exports = ExerciseUser;
