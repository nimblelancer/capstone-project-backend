require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const { default: helmet } = require("helmet");
const compression = require("compression");
const app = express();
const connectDB = require("./src/configs/config.mongodb");

//Import routes
const initHealthRecord = require("./src/routes/HealthRecord");
const initUser = require("./src/routes/User");
const initBasicInfoRoute = require("./src/routes/BasicInfo");
const initMedicalHistoryRoute = require("./src/routes/MedicalHistory");
const initVaccinationRoute = require("./src/routes/Vaccination");
const initAppointmentRoute = require("./src/routes/Appoinment");
const initDiseaseRoute = require("./src/routes/Disease");
const initDoctorRoute = require("./src/routes/Doctor");
const session = require('express-session');
const cookieParser = require('cookie-parser');
// init middleware
app.use(morgan("dev"));
app.use(helmet());
app.use(compression());
app.use(express.json());
app.use(cookieParser());
app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: true } // Note: This should be set to true if your app is served over HTTPS
}));

// init db
connectDB();
// Add middleware CORS
app.use(cors());
app.options('*', cors());
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
