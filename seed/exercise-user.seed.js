require("dotenv/config");
require("../db/db.index");

const Session = require("../models/session.model");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("../models/user.model");
const password = "password";
const ExerciseType = require("../models/exercise-type.model");

const ExerciseUser = require("../models/exercise-user.model");

(async function () {
  const exercisesUserToCreate = [
    {
      weight: [25, 23, 20],
      rep: [4, 7, 8],
    },
    {
      weight: [12, 10, 8],
      rep: [10, 9, 8],
    },
    {
      weight: [33, 30, 28],
      rep: [9, 10, 12],
    },
    {
      weight: [20, 17, 15],
      rep: [3, 7, 8],
    },
  ];

  try {
    await ExerciseUser.deleteMany({});

    // delete exercise user list
    await Session.updateMany({}, { $set: { exercise_user_list: [] } });

    const user = await User.findOne({ email: "pro.julien.thomas@gmail.com" });

    const session1 = await Session.findById("66056296fc0233d5e4d949eb");
    const session2 = await Session.findById("66056296fc0233d5e4d949ec");
    const tractionType = await ExerciseType.findOne({ name: "Tractions" });
    const devCoucheInclineType = await ExerciseType.findOne({
      name: "Développé couché incliné",
    });
    const elevationsFrontales = await ExerciseType.findOne({
      name: "Élévations frontales",
    });
    const curlIncline = await ExerciseType.findOne({
      name: "Curl incliné",
    });

    console.log("👋 Session1", session1);

    exercisesUserToCreate[0].type = tractionType;
    exercisesUserToCreate[1].type = devCoucheInclineType;
    exercisesUserToCreate[2].type = elevationsFrontales;
    exercisesUserToCreate[3].type = curlIncline;

    const exercices = await ExerciseUser.find({});

    exercisesUserToCreate[0].owner = user;
    exercisesUserToCreate[1].owner = user;
    exercisesUserToCreate[2].owner = user;
    exercisesUserToCreate[3].owner = user;

    await ExerciseUser.create(exercisesUserToCreate);

    const exerciseUser1 = await ExerciseUser.findOne({
      type: tractionType,
      owner: user._id,
    });
    const exerciseUser2 = await ExerciseUser.findOne({
      type: devCoucheInclineType,
      owner: user._id,
    });
    const exerciseUser3 = await ExerciseUser.findOne({
      type: elevationsFrontales,
      owner: user._id,
    });
    const exerciseUser4 = await ExerciseUser.findOne({
      type: curlIncline,
      owner: user._id,
    });

    session1.exercise_user_list.push(exerciseUser1);
    session1.exercise_user_list.push(exerciseUser2);
    session1.exercise_user_list.push(exerciseUser3);
    session1.exercise_user_list.push(exerciseUser4);

    await session1.save();

    // add exercise to session 2

    const exerciseUser5 = await ExerciseUser.findOne({
      type: tractionType,
      owner: user._id,
    });
    const exerciseUser6 = await ExerciseUser.findOne({
      type: devCoucheInclineType,
      owner: user._id,
    });
    const exerciseUser7 = await ExerciseUser.findOne({
      type: elevationsFrontales,
      owner: user._id,
    });
    const exerciseUser8 = await ExerciseUser.findOne({
      type: curlIncline,
      owner: user._id,
    });

    session2.exercise_user_list.push(exerciseUser5);
    session2.exercise_user_list.push(exerciseUser6);
    session2.exercise_user_list.push(exerciseUser7);
    session2.exercise_user_list.push(exerciseUser8);

    await session2.save();
  } catch (error) {
    console.log(error);
  } finally {
    process.exit();
  }
})();
