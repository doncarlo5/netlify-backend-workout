require("dotenv/config");
require("../db/db.index");

const ExerciseType = require("../models/ExerciseType.model");

const exercisesTypeToCreate = [
  {
    name: "Développé couché incliné",
    type: "bar",
    advice: "Rétraction scapulaire",
    timer: 120,
    repRange1: "8-12",
    repRange2: "6-10",
    repRange3: "4-8",
  },
  {
    name: "Tractions",
    type: "free-weight",
    advice: "Enclencher les épaules",
    timer: 120,
    repRange1: "8-12",
    repRange2: "6-10",
    repRange3: "4-8",
  },
  {
    name: "Élévations frontales",
    type: "free-weight",
    advice: "Pic de contraction 2 secondes",
    timer: 90,
    repRange1: "8-12",
    repRange2: "6-10",
    repRange3: "4-8",
  },
  {
    name: "Curl incliné",
    type: "free-weight",
    advice: "inclinaison de 90°",
    timer: 90,
    repRange1: "8-12",
    repRange2: "6-10",
    repRange3: "4-8",
  },
  {
    name: "Élévation latérales",
    type: "free-weight",
    advice: "Serrer le petit doigt",
    timer: 60,
    repRange1: "8-12",
    repRange2: "6-10",
    repRange3: "4-8",
  },
];

(async function () {
  try {
    await ExerciseType.deleteMany({});

    for (const ExerciseTypeElement of exercisesTypeToCreate) {
      await ExerciseType.create(ExerciseTypeElement);
    }

    //exercisesTypeToCreate directly in create

    // console.log(allUsers)
  } catch (error) {
    console.log(error);
  } finally {
    process.exit();
  }
})();

// 0. create the session (doc lié à un user) exercices id [] array vide
// 1. session/id session créée
// 2. fetch all the exercises from exerciceType and exercices
// 3. click exercise, fill the form and save (create exercise)
// 4. add the exercise to the session
// 5. save the session
