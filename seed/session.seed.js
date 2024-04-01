require("dotenv/config");
require("../db/db.index");
const password = "password";
const bcrypt = require("bcrypt");

const User = require("../models/user.model");
const mongoose = require("mongoose");
const Session = require("../models/session.model");

(async function () {
  const sessionToCreate = [
    {
      date_session: new Date(),
      type_session: "Upper A",
      body_weight: 70,
      exercise_user_list: [],
      isDone: false,
    },
    {
      date_session: new Date(),
      type_session: "Lower",
      body_weight: 69,
      exercise_user_list: [],
      isDone: false,
    },
    {
      date_session: new Date(),
      type_session: "Upper B",
      body_weight: 69,
      exercise_user_list: [],
      isDone: false,
    },
  ];

  try {
    await User.deleteMany();
    await Session.deleteMany({});
    await User.create({
      email: "pro.julien.thomas@gmail.com",
      firstName: "Julien",
      lastName: "THOMAS",
      password: bcrypt.hashSync(password, 10),
    });

    const user = await User.findOne({ email: "pro.julien.thomas@gmail.com" });

    sessionToCreate[0].owner = user;
    sessionToCreate[1].owner = user;
    sessionToCreate[2].owner = user;

    await Session.create(sessionToCreate);
  } catch (error) {
    console.log(error);
  } finally {
    process.exit();
  }
})();
