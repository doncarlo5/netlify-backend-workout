const { Schema, model } = require("mongoose");

const exerciseUserSchema = new Schema(
  {
    type: {
      type: Schema.Types.ObjectId,
      ref: "ExerciseType",
      index: true,
    },
    weight: { type: [Number], required: true },
    rep: { type: [Number], required: true },
    session: {
      type: Schema.Types.ObjectId,
      ref: "Session",
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    comment: { type: String, maxLength: 30 },
  },
  {
    timestamps: true,
  }
);

const ExerciseUser = model("ExerciseUser", exerciseUserSchema);

module.exports = ExerciseUser;
