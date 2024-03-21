require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const { default: helmet } = require("helmet");
const compression = require("compression");
const app = express();
const connectDB = require("./src/configs/config.mongodb");
const cors = require('cors');

//Import routes
const initHealthRecord = require("./src/routes/HealthRecord");
const initUser = require("./src/routes/User");
const initBasicInfoRoute = require("./src/routes/BasicInfo");
const initMedicalHistoryRoute = require("./src/routes/MedicalHistory");
const initVaccinationRoute = require("./src/routes/Vaccination");
const initAppointmentRoute = require("./src/routes/Appoinment");
const initDiseaseRoute = require("./src/routes/Disease");
const initDoctorRoute = require("./src/routes/Doctor");

// init middleware
app.use(express.json());
app.use(morgan("dev"));
app.use(helmet());
app.use(compression());
app.use(cors());
// init db
connectDB();
// init routes
initHealthRecord(app);
initUser(app);
initBasicInfoRoute(app);
initMedicalHistoryRoute(app);
initVaccinationRoute(app);
initAppointmentRoute(app);
initDiseaseRoute(app);
initDoctorRoute(app);
// handle errors

module.exports = app;
