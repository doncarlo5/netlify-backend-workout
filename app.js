// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require("dotenv").config();

// Connect to the database
require("./db/db.index");

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require("express");

const app = express();

// This function is getting exported from the config folder. It runs most pieces of middleware
require("./config/config.index")(app);

// Start handling routes here
const indexRoutes = require("./routes/index.routes");
app.use("/", indexRoutes);

// To handle errors. Routes that don't exist or errors that you handle in specific routes
require("./error-handling/error-handling.index")(app);

module.exports = app;
