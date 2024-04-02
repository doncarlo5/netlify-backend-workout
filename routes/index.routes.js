const router = require("express").Router();
const isAuthenticated = require("../middleware/is-authenticated");

router.get("/", (req, res, next) => {
  res.json("All good in here");
});

router.use("/auth", require("./auth.routes"));

router.use("/sessions", isAuthenticated, require("./sessions.routes"));

router.use(
  "/exercise-user",
  isAuthenticated,
  require("./exercise-user.routes")
);

router.use("/exercise-type", require("./exercise-type.routes"));

module.exports = router;
