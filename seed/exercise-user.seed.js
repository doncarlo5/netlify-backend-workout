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
      weight: [22.5, 20, 17.5],
      rep: [3, 6, 9],
    },
    {
      weight: [30, 28.75, 27.5],
      rep: [5, 6, 6],
    },
    {
      weight: [7, 7, 7],
      rep: [12, 11, 10],
    },
    {
      weight: [14, 14, 14],
      rep: [10, 9, 7],
    },
    {
      weight: [16, 18, 20],
      rep: [16, 9, 8],
    },
    {
      weight: [25, 25, 25],
      rep: [10, 10, 11],
    },
    {
      weight: [16, 16, 16],
      rep: [10, 11, 12],
    },
    {
      weight: [36, 36, 36],
      rep: [12, 10, 10],
    },

    {
      weight: [52, 52, 52],
      rep: [10, 11, 10],
    },
    {
      weight: [25, 27.5, 30],
      rep: [15, 10, 8],
    },
    {
      weight: [14, 16, 18],
      rep: [20, 14, 8],
    },
    {
      weight: [13.75, 12.5, 8.75],
      rep: [4, 7, 12],
    },
    {
      weight: [25, 22.5, 20],
      rep: [5, 6, 8],
    },
    {
      weight: [13.73, 13.73, 13.73],
      rep: [12, 11, 10],
    },
    {
      weight: [16, 16, 16],
      rep: [14, 13, 12],
    },
    {
      weight: [22, 24, 26],
      rep: [14, 9, 7],
    },
  ];

  try {
    await ExerciseUser.deleteMany({});

    await Session.updateMany({}, { $set: { exercise_user_list: [] } });

    const user = await User.findOne({ email: "pro.julien.thomas@gmail.com" });

    const session1 = await Session.findById("660ad93996979793c963ed44");
    const session2 = await Session.findById("660ad93996979793c963ed45");
    const session3 = await Session.findById("660ad93996979793c963ed46");

    // identify the exercise type
    // session 1
    const developpeCoucheInclineType = await ExerciseType.findOne({
      name: "Développé couché incliné",
    });
    const tractionType = await ExerciseType.findOne({ name: "Tractions" });
    const poulis = await ExerciseType.findOne({
      name: "Poulis",
    });
    const curlIncline = await ExerciseType.findOne({
      name: "Curl incliné",
    });
    const elevationLaterale = await ExerciseType.findOne({
      name: "Élévation latérales",
    });

    // session 2
    const squatType = await ExerciseType.findOne({ name: "Squat" });
    const fentesType = await ExerciseType.findOne({ name: "Fentes" });
    const legCurlType = await ExerciseType.findOne({ name: "Leg curl" });
    const legExtensionType = await ExerciseType.findOne({
      name: "Leg extension",
    });
    const extensionMoletType = await ExerciseType.findOne({
      name: "Extensions mollets",
    });
    const uprightRowInclineType = await ExerciseType.findOne({
      name: "Upright row penché",
    });

    // session 3
    const overheadPressType = await ExerciseType.findOne({
      name: "Overhead press",
    });
    const developpeCoucheType = await ExerciseType.findOne({
      name: "Développé couché",
    });
    const tractionNeutreType = await ExerciseType.findOne({
      name: "Tractions neutres",
    });
    const oiseauType = await ExerciseType.findOne({ name: "Oiseau" });
    const uprightRowType = await ExerciseType.findOne({ name: "Upright row" });

    // put the exercise type in the exercise user
    //session 1

    exercisesUserToCreate[0].type = developpeCoucheInclineType;
    exercisesUserToCreate[1].type = tractionType;
    exercisesUserToCreate[2].type = poulis;
    exercisesUserToCreate[3].type = curlIncline;
    exercisesUserToCreate[4].type = elevationLaterale;

    // session 2

    exercisesUserToCreate[5].type = squatType;
    exercisesUserToCreate[6].type = fentesType;
    exercisesUserToCreate[7].type = legCurlType;
    exercisesUserToCreate[8].type = legExtensionType;
    exercisesUserToCreate[9].type = extensionMoletType;
    exercisesUserToCreate[10].type = uprightRowInclineType;

    // session 3
    exercisesUserToCreate[11].type = overheadPressType;
    exercisesUserToCreate[12].type = developpeCoucheType;
    exercisesUserToCreate[13].type = tractionNeutreType;
    exercisesUserToCreate[14].type = oiseauType;
    exercisesUserToCreate[15].type = uprightRowType;

    const exercices = await ExerciseUser.find({});

    exercisesUserToCreate[0].owner = user;
    exercisesUserToCreate[1].owner = user;
    exercisesUserToCreate[2].owner = user;
    exercisesUserToCreate[3].owner = user;
    exercisesUserToCreate[4].owner = user;
    exercisesUserToCreate[5].owner = user;
    exercisesUserToCreate[6].owner = user;
    exercisesUserToCreate[7].owner = user;
    exercisesUserToCreate[8].owner = user;
    exercisesUserToCreate[9].owner = user;
    exercisesUserToCreate[10].owner = user;
    exercisesUserToCreate[11].owner = user;
    exercisesUserToCreate[12].owner = user;
    exercisesUserToCreate[13].owner = user;
    exercisesUserToCreate[14].owner = user;
    exercisesUserToCreate[15].owner = user;

    await ExerciseUser.create(exercisesUserToCreate);

    // add exercise to session 1

    const exerciseUser1 = await ExerciseUser.findOne({
      type: developpeCoucheInclineType,
      owner: user._id,
    });
    const exerciseUser2 = await ExerciseUser.findOne({
      type: tractionType,
      owner: user._id,
    });
    const exerciseUser3 = await ExerciseUser.findOne({
      type: poulis,
      owner: user._id,
    });
    const exerciseUser4 = await ExerciseUser.findOne({
      type: curlIncline,
      owner: user._id,
    });
    const exerciseUser5 = await ExerciseUser.findOne({
      type: elevationLaterale,
      owner: user._id,
    });

    session1.exercise_user_list.push(exerciseUser1);
    session1.exercise_user_list.push(exerciseUser2);
    session1.exercise_user_list.push(exerciseUser3);
    session1.exercise_user_list.push(exerciseUser4);
    session1.exercise_user_list.push(exerciseUser5);

    await session1.save();

    // add exercise to session 2

    const exerciseUser6 = await ExerciseUser.findOne({
      type: squatType,
      owner: user._id,
    });
    const exerciseUser7 = await ExerciseUser.findOne({
      type: fentesType,
      owner: user._id,
    });
    const exerciseUser8 = await ExerciseUser.findOne({
      type: legCurlType,
      owner: user._id,
    });
    const exerciseUser9 = await ExerciseUser.findOne({
      type: legExtensionType,
      owner: user._id,
    });
    const exerciseUser10 = await ExerciseUser.findOne({
      type: extensionMoletType,
      owner: user._id,
    });
    const exerciseUser11 = await ExerciseUser.findOne({
      type: uprightRowInclineType,
      owner: user._id,
    });

    session2.exercise_user_list.push(exerciseUser6);
    session2.exercise_user_list.push(exerciseUser7);
    session2.exercise_user_list.push(exerciseUser8);
    session2.exercise_user_list.push(exerciseUser9);
    session2.exercise_user_list.push(exerciseUser10);
    session2.exercise_user_list.push(exerciseUser11);

    await session2.save();

    // add exercise to session 3

    const exerciseUser12 = await ExerciseUser.findOne({
      type: overheadPressType,
      owner: user._id,
    });
    const exerciseUser13 = await ExerciseUser.findOne({
      type: developpeCoucheType,
      owner: user._id,
    });
    const exerciseUser14 = await ExerciseUser.findOne({
      type: tractionNeutreType,
      owner: user._id,
    });
    const exerciseUser15 = await ExerciseUser.findOne({
      type: oiseauType,
      owner: user._id,
    });
    const exerciseUser16 = await ExerciseUser.findOne({
      type: uprightRowType,
      owner: user._id,
    });

    session3.exercise_user_list.push(exerciseUser12);
    session3.exercise_user_list.push(exerciseUser13);
    session3.exercise_user_list.push(exerciseUser14);
    session3.exercise_user_list.push(exerciseUser15);
    session3.exercise_user_list.push(exerciseUser16);

    await session3.save();

    await Session.findByIdAndUpdate(session1._id, { isDone: true });
    await Session.findByIdAndUpdate(session2._id, { isDone: true });
    await Session.findByIdAndUpdate(session3._id, { isDone: true });
  } catch (error) {
    console.log(error);
  } finally {
    process.exit();
  }
})();
