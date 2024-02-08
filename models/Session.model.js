const { Schema, model } = require("mongoose");

const sessionSchema = new Schema(
  {
    date: {
      type: Date,
      required: [true, "Date is required"],
    },
    body_weight: {
      type: Number,
      required: [true, "Weight is required."],
    },
    // comment: {
    //   type: String,
    // },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    session_index: { type: Number, default: 1 },
    exercise_ids: [{ type: Schema.Types.ObjectId, ref: "Exercise" }], // Array of exercise IDs
  },
  {
    timestamps: true, // Adds `createdAt` and `updatedAt` properties
  }
);

const Session = model("Session", sessionSchema);

module.exports = Session;
