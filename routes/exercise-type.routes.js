const ExerciseType = require("../models/exercise-type.model");

const router = require("express").Router();

// Get all exercise types

router.get("/", async (req, res, next) => {
  try {
    const typeSession = req.query.type_session;
    let query = {};
    if (typeSession) {
      query = { type_session: typeSession };
    }
    const exerciseUsers = await ExerciseType.find(query);
    res.json(exerciseUsers);
  } catch (error) {
    next(error);
  }
});

//

// Create an exercise type

router.post("/", async (req, res, next) => {
  try {
    const { name, type, advice, timer, repRange1, repRange2, repRange3 } =
      req.body;

    if (
      !name ||
      !type ||
      !advice ||
      !timer ||
      !repRange1 ||
      !repRange2 ||
      !repRange3
    ) {
      return res.status(400).json({ message: "Missing fields" });
    }

    if (name || type || advice !== typeof String) {
      return res.status(400).json({ message: "Name should be a string" });
    }

    if (timer || repRange1 || repRange2 || repRange3 !== typeof Number) {
      return res.status(400).json({ message: "Timer should be a number" });
    }

    const createExerciseType = await ExerciseType.create({
      name: name,
      type: type,
      advice: advice,
      timer: timer,
      repRange1: repRange1,
      repRange2: repRange2,
      repRange3: repRange3,
      owner: req.user._id,
    });

    res.status(201).json({ id: createExerciseType._id });
  } catch (error) {
    next(error);
  }
});

// add delete

// add update

module.exports = router;
