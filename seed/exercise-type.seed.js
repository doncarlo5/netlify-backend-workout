require("dotenv/config");
require("../db/db.index");

const ExerciseType = require("../models/exercise-type.model");

const exercisesTypeToCreate = [
  {
    name: "Développé couché incliné",
    type: "bar",
    advice: "Rétraction scapulaire",
    timer: 150,
    repRange1: "4-6",
    repRange2: "6-8",
    repRange3: "8-10",
    type_session: "Upper A",
  },
  {
    name: "Tractions",
    type: "free-weight",
    advice: "Enclencher les épaules",
    timer: 120,
    repRange1: "4-6",
    repRange2: "6-8",
    repRange3: "8-10",
    type_session: "Upper A",
  },
  {
    name: "Élévations frontales",
    type: "free-weight",
    advice: "Pic de contraction 2 secondes",
    timer: 90,
    repRange1: "10-15",
    repRange2: "10-15",
    repRange3: "10-15",
    type_session: "Upper A",
  },
  {
    name: "Curl incliné",
    type: "free-weight",
    advice: "inclinaison de 90°",
    timer: 90,
    repRange1: "8-12",
    repRange2: "8-12",
    repRange3: "8-12",
    type_session: "Upper A",
  },
  {
    name: "Élévation latérales",
    type: "free-weight",
    advice: "Serrer le petit doigt",
    timer: 60,
    repRange1: "15-20",
    repRange2: "10-15",
    repRange3: "8-10",
    type_session: "Upper A",
  },
  {
    name: "Squat",
    type: "bar",
    advice: "Enclencher bassin",
    timer: 120,
    repRange1: "6-10",
    repRange2: "6-10",
    repRange3: "6-10",
    type_session: "Lower",
  },
  {
    name: "Fentes",
    type: "free-weight",
    advice: "1 min de chaque côté",
    timer: 60,
    repRange1: "10-15",
    repRange2: "10-15",
    repRange3: "10-15",
    type_session: "Lower",
  },
  {
    name: "Leg curl",
    type: "machine",
    advice: "Contrôler la descente",
    timer: 30,
    repRange1: "8-12",
    repRange2: "8-12",
    repRange3: "8-12",
    type_session: "Lower",
  },
  {
    name: "Leg extension",
    type: "machine",
    advice: "Contrôler la descente",
    timer: 30,
    repRange1: "8-12",
    repRange2: "8-12",
    repRange3: "8-12",
    type_session: "Lower",
  },
  {
    name: "Extensions mollets",
    type: "bar",
    advice: "Tempo 1-2-2-1",
    timer: 60,
    repRange1: "12-15",
    repRange2: "8-12",
    repRange3: "6-10",
    type_session: "Lower",
  },
  {
    name: "Upright row penché",
    type: "free-weight",
    advice: "Ne pas trop se pencher",
    timer: 60,
    repRange1: "15-20",
    repRange2: "10-15",
    repRange3: "6-10",
    type_session: "Lower",
  },
  {
    name: "Mollets",
    type: "machine",
    advice: "Contrôler la descente",
    timer: 30,
    repRange1: "8-12",
    repRange2: "8-12",
    repRange3: "8-12",
    type_session: "Lower",
  },
  {
    name: "Overhead press",
    type: "bar",
    advice: "Serrer les fesses",
    timer: 150,
    repRange1: "4-6",
    repRange2: "6-8",
    repRange3: "8-10",
    type_session: "Upper B",
  },
  {
    name: "Développé couché",
    type: "bar",
    advice: "Serrer les coudes",
    timer: 120,
    repRange1: "4-6",
    repRange2: "6-8",
    repRange3: "8-10",
    type_session: "Upper B",
  },
  {
    name: "Tractions neutres",
    type: "free-weight",
    advice: "Tirer avec les bras",
    timer: 90,
    repRange1: "8-12",
    repRange2: "8-12",
    repRange3: "8-12",
    type_session: "Upper B",
  },
  {
    name: "Oiseau",
    type: "free-weight",
    advice: "Coude à 90 degrès",
    timer: 60,
    repRange1: "10-15",
    repRange2: "10-15",
    repRange3: "10-15",
    type_session: "Upper B",
  },
  {
    name: "Upright row",
    type: "free-weight",
    advice: "Serrer les omoplates",
    timer: 60,
    repRange1: "12-15",
    repRange2: "8-12",
    repRange3: "6-10",
    type_session: "Upper B",
  },
];

(async function () {
  try {
    await ExerciseType.deleteMany({});
    for (const ExerciseTypeElement of exercisesTypeToCreate) {
      await ExerciseType.create(ExerciseTypeElement);
    }
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
