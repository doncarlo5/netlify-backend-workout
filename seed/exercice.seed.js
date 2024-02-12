require("dotenv/config");
require("../config/config.index");

const Exercise = require("../models/Exercise.model");
const User = require("../models/User.model");

const exercisesToCreate = [
  {
    name: "Développé couché incliné",
    type: "bar",
    advice: "Rétraction scapulaire",
    timer: 120,
  },
  {
    name: "Tractions",
    type: "free-weight",
    advice: "Enclencher les épaules",
    timer: 120,
  },
  {
    name: "Élévation frontales",
    type: "free-weight",
    advice: "Pic de contraction 2 secondes",
    timer: 90,
  },
  {
    name: "Curl incliné",
    type: "free-weight",
    advice: "Maintain control and avoid swinging the weights.",
    timer: 90,
  },
  {
    name: "Tractions",
    type: "free-weight",
    advice: "Maintain control and avoid swinging the weights.",
    timer: 60,
  },
];
