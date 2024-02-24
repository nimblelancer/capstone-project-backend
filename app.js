require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const { default: helmet } = require("helmet");
const compression = require("compression");
const app = express();
const connectDB = require("./src/configs/config.mongodb");
const { required } = require("nodemon/lib/config");

var diseaseRouter = require("./src/routes/diseaseRoute");
var router = require("./src/routes/healthRecordRoute");

// init middleware
app.use(morgan("dev"));
app.use(helmet());
app.use(compression());

// init db
connectDB();
// init routes
app.use("/disease", diseaseRouter);
app.use("/healthrecord", router);
// handle errors

module.exports = app;
