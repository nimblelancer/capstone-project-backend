require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const { default: helmet } = require("helmet");
const compression = require("compression");
const app = express();
const connectDB = require("./src/configs/config.mongodb");

//Import routes
const initHealthRecord = require("./src/routes/HealthRecord");
const initUser = require("./src/routes/User");

// init middleware
app.use(morgan("dev"));
app.use(helmet());
app.use(compression());

// init db
connectDB();
// init routes
initHealthRecord(app);
initUser(app);
// handle errors

module.exports = app;
