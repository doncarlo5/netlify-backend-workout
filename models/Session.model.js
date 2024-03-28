const { Schema, model } = require("mongoose");

const sessionSchema = new Schema(
  {
    date_session: { type: Date, default: Date.now },
    body_weight: {
      type: Number,
      required: true,
    },
    exercise_user_list: [
      {
        type: Schema.Types.ObjectId,
        ref: "ExerciseUser",
      },
    ],
    isDone: { type: Boolean, default: false },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const Session = model("Session", sessionSchema);

module.exports = Session;
