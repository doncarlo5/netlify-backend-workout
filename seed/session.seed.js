require("dotenv/config");
require("../db/db.index");

const ExerciseUser = require("../models/exercise-user.model");

const User = require("../models/User.model");

const mongoose = require("mongoose");
const Session = require("../models/Session.model");

(async function () {
  const sessionToCreate = [
    {
      dateSession: new Date(),
      exerciseUser_ids: [],
    },
  ];

  try {
    await Session.deleteMany({});

    const exercices = await ExerciseUser.find({});

    const user = await User.findOne({ email: "pro.julien.thomas@gmail.com" });

    sessionToCreate[0].owner = user;
    sessionToCreate[0].exerciseUser_ids.push(exercices[0]);
    sessionToCreate[0].exerciseUser_ids.push(exercices[1]);

    for (const sessionElement of sessionToCreate) {
      await Session.create(sessionElement);
    }

    // console.log(allUsers)
  } catch (error) {
    console.log(error);
  } finally {
    process.exit();
  }
})();
