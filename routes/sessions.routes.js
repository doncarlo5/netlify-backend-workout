const router = require("express").Router();
const Session = require("../models/session.model");
const isAuthenticated = require("../middleware/is-authenticated");

// Get all sessions by user

router.get("/", isAuthenticated, async (req, res, next) => {
  try {
    const session = await Session.find({ owner: req.user._id }).populate(
      "exercise_user_list"
    );
    res.json(session);
  } catch (error) {
    next(error);
  }
});

// Get one session by ID

router.get("/:id", async (req, res, next) => {
  try {
    const session = await Session.findOne({ _id: req.params.id }).populate({
      path: "exercise_user_list",
      populate: {
        path: "type",
      },
    });

    res.json(session);
  } catch (error) {
    next(error);
  }
});

// Create a session

router.post("/", isAuthenticated, async (req, res, next) => {
  try {
    const createSession = await Session.create({
      date_session: req.body.date_session,
      type_session: req.body.type_session,
      body_weight: req.body.body_weight,
      exercise_user_list: req.body.exercise_user_list,
      is_done: req.body.is_done,
      comment: req.body.comment,
      owner: req.user._id,
    });
    res.json(createSession);
  } catch (error) {
    next(error);
  }
});

// Update a session

router.put("/:id", async (req, res, next) => {
  try {
    let {
      date_session,
      type_session,
      body_weight,
      exercise_user_list,
      is_done,
      comment,
    } = req.body;

    if (comment.lenght > 30) {
      return res
        .status(400)
        .json({ message: "Comment should be less than 30 characters" });
    }

    if (!date_session) {
      return res.status(400).json({ message: "Missing date session" });
    }

    if (!type_session) {
      return res.status(400).json({ message: "Missing type session" });
    }

    if (!body_weight) {
      return res.status(400).json({ message: "Missing body weight" });
    }

    if (!exercise_user_list) {
      return res.status(400).json({ message: "Missing exercise user list" });
    }

    if (!is_done) {
      return res.status(400).json({ message: "Missing is_done" });
    }

    const updateSession = await Session.findOneAndUpdate(
      { _id: req.params.id },
      {
        date_session,
        type_session,
        body_weight,
        exercise_user_list,
        is_done,
        comment,
      },
      { new: true }
    );
    res.json(updateSession);
  } catch (error) {
    next(error);
  }
});

// Delete a session

router.delete("/:id", async (req, res, next) => {
  try {
    const deleteSession = await Session.findOneAndDelete({
      _id: req.params.id,
    });
    res.json(deleteSession);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
