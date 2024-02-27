require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const { default: helmet } = require("helmet");
const compression = require("compression");
const app = express();
const connectDB = require("./src/configs/config.mongodb");

//Import routes
const initBasicInfoRoute = require("./src/routes/BasicInfo");
const initMedicalHistoryRoute = require("./src/routes/MedicalHistory");
const initVaccinationRoute = require("./src/routes/Vaccination");
const initAppointmentRoute = require("./src/routes/Appoinment");
<<<<<<< HEAD
const initDiseaseRoute = require("./src/routes/Disease");
=======
const initDoctorRoute = require("./src/routes/Doctor");

>>>>>>> 1256b7fe191a823cc38a92144505f4cd3f01d3b0
// init middleware
app.use(morgan("dev"));
app.use(helmet());
app.use(compression());

// init db
connectDB();
// init routes
initBasicInfoRoute(app);
initMedicalHistoryRoute(app);
initVaccinationRoute(app);
initAppointmentRoute(app);
<<<<<<< HEAD
initDiseaseRoute(app);
=======
initDoctorRoute(app);
>>>>>>> 1256b7fe191a823cc38a92144505f4cd3f01d3b0
// handle errors

module.exports = app;
