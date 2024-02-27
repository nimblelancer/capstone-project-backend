require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const { default: helmet } = require("helmet");
const compression = require("compression");
const app = express();
const connectDB = require("./src/configs/config.mongodb");

//Import routes
const basicInfoRoute = require("./src/routes/BasicInfor");
const initMedicalHistoryRoute = require("./src/routes/MedicalHistory");
const initVaccinationRoute = require("./src/routes/Vaccination");
const initAppointmentRoute = require("./src/routes/Appoinment");
const initDoctorRoute = require("./src/routes/Doctor");

// init middleware
app.use(morgan("dev"));
app.use(helmet());
app.use(compression());

// init db
connectDB();
// init routes
app.use("/basic-info", basicInfoRoute);
initMedicalHistoryRoute(app);
initVaccinationRoute(app);
initAppointmentRoute(app);
initDoctorRoute(app);
// handle errors

module.exports = app;
