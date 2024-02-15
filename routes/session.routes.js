const router = require("express").Router();
const Session = require("../models/Session.model");
const isAuthenticated = require("../middleware/is-authenticated");

// Get all sessions by user

router.get("/sessions", isAuthenticated, async (req, res, next) => {
  try {
    const sessions = await Session.find({ owner: req.user._id }).populate(
      "exerciseUser_ids"
    );
    res.json(sessions);
  } catch (error) {
    next(error);
  }
});

// Get one session by ID

router.get("/sessions/:id", async (req, res, next) => {
  try {
    const session = await Session.findOne({ _id: req.params.id }).populate(
      "exerciseUser_ids"
    );
    res.json(session);
  } catch (error) {
    next(error);
  }
});

// Create a session

router.post("/sessions", isAuthenticated, async (req, res, next) => {
  try {
    const createSession = await Session.create({
      dateSession: req.body.dateSession,
      exerciseUser_ids: req.body.exerciseUser_ids,
      owner: req.user._id,
    });
    res.json(createSession);
  } catch (error) {
    next(error);
  }
});

// Update a session

router.put("/sessions/:id", async (req, res, next) => {
  try {
    let { dateSession, exerciseUser_ids } = req.body;

    if (!dateSession || !exerciseUser_ids) {
      return res.status(400).json({ message: "Missing fields" });
    }

    const updateSession = await Session.findOneAndUpdate(
      { _id: req.params.id },
      {
        dateSession,
        exerciseUser_ids,
      },
      { new: true }
    );
    res.json(updateSession);
  } catch (error) {
    next(error);
  }
});

// Delete a session

router.delete("/sessions/:id", async (req, res, next) => {
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
