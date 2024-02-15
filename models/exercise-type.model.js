const { Schema, model } = require("mongoose");

// Define the Exercise schema
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
  // image: {
  //   type: String,
  //   default:
  //     "https://toppng.com/uploads/preview/weights-svg-vector-weightlifting-icon-11553466117vxf3vpx9io.png",
  // },
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

// nom
// advice
// timer

// find the exercise by id .populate exercise type

// 1. recuperer une seesion par son id
// 2. populate les exercices de la session
// 3. dans exercice id, populate le type d'exercice

// SessionModel
//   .findById()
//   .populate({
//     path : 'exercice_ids',
//     populate : {
//       path : 'exercicetype'
//     }
//   })
//   .exec(function (err, res) {

//   })
