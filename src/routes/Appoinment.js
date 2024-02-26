module.exports = (app) => {
  const appointment = require("../controllers/Appointment");

  var router = require("express").Router();

  router.get("/healthRecord", appointment.findAppointmentByHealthRecord);
  router.get("/", appointment.findAllAppointment);
  router.get("/:id", appointment.findAppointmentById);

  router.post("/", appointment.createAppointment);
  router.put("/:id", appointment.updateAppointment);
  router.delete("/:id", appointment.deleteAppointmentById);

  app.use("/api/appointment", router);
};
