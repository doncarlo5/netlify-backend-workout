const router = require("express").Router();
const isAuthenticated = require("../middleware/isAuthenticated");

router.get("/", (req, res, next) => {
  res.json("All good in here");
});

router.use("/auth", require("./auth.routes"));

router.use(
  "/exercise-user",
  isAuthenticated,
  require("./exercise-user.routes")
);

router.use("/exercise-type", require("./exercise-type.routes")); //! Should be in exercise user

module.exports = router;
