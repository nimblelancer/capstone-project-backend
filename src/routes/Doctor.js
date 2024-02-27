module.exports = (app) => {
  const doctor = require("../controllers/Doctor");

  var router = require("express").Router();

  router.get("/", doctor.findAllDoctors);
  router.get("/:id", doctor.findDoctorById);

  router.post("/", doctor.createDoctor);
  router.put("/:id", doctor.updateDoctor);
  router.delete("/:id", doctor.deleteDoctorbyId);

  app.use("/api/doctor", router);
};
