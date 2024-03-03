module.exports = (app) => {
  const vaccination = require("../controllers/Vaccination");

  var router = require("express").Router();

  router.get("/disease", vaccination.findVaccinationByDisease);
  router.get("/", vaccination.findAllVaccination);
  router.get("/:id", vaccination.findVaccinationById);

  router.post("/", vaccination.createVaccination);
  router.put("/:id", vaccination.updateVaccination);
  router.delete("/:id", vaccination.deleteVaccinationById);

  app.use("/api/vaccination", router);
};
