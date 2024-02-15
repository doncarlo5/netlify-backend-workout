require("dotenv/config");
require("../db/db.index");
const Session = require("../models/Session.model");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("../models/User.model");
const password = "password";
const ExerciseType = require("../models/exercise-type.model");

const ExerciseUser = require("../models/exercise-user.model");

(async function () {
  const exercisesUserToCreate = [
    {
      date: new Date(),
      weight: [25, 23, 20],
      rep: [4, 7, 8],
    },
    {
      date: new Date(),
      weight: [12, 10, 8],
      rep: [10, 9, 8],
    },
    {
      date: new Date(),
      weight: [33, 30, 28],
      rep: [9, 10, 12],
    },
    {
      date: new Date(),
      weight: [20, 17, 15],
      rep: [3, 7, 8],
    },
  ];

  try {
    await User.deleteMany();
    await User.create({
      email: "pro.julien.thomas@gmail.com",
      firstName: "Julien",
      lastName: "THOMAS",
      password: bcrypt.hashSync(password, 10),
    });
    await ExerciseUser.deleteMany({});
    const user = await User.findOne({ email: "pro.julien.thomas@gmail.com" });

    // const session = await Session.findById("65cb2ab3880d64b5a0b5c5e5");
    const tractionType = await ExerciseType.findOne({ name: "Tractions" });
    const devCoucheInclineType = await ExerciseType.findOne({
      name: "Développé couché incliné",
    });

    exercisesUserToCreate[0].type = devCoucheInclineType;
    exercisesUserToCreate[1].type = tractionType;
    // exercisesUserToCreate[0].session = session._id;
    // exercisesUserToCreate[1].session = session._id;

    exercisesUserToCreate[0].owner = user;
    exercisesUserToCreate[1].owner = user;

    await ExerciseUser.create(exercisesUserToCreate);

    // console.log(allUsers)
  } catch (error) {
    console.log(error);
  } finally {
    process.exit();
  }
})();
