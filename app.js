require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const { default: helmet } = require("helmet");
const compression = require("compression");
const app = express();
const connectDB = require("./src/configs/config.mongodb");

//Import routes
const basicInfoRouter = require("./src/routes/basicInfoRouter");
const initMedicalHistoryRoute = require("./src/routes/MedicalHistory");

// init middleware
app.use(morgan("dev"));
app.use(helmet());
app.use(compression());

// init db
connectDB();
// init routes
app.use("/basic-info", basicInfoRouter);
initMedicalHistoryRoute(app);
// handle errors

module.exports = app;
