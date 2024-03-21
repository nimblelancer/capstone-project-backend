module.exports = (app) => {
  const healthRecordController = require("../controllers/HealthRecord");

  var router = require("express").Router();

  router.get("/", healthRecordController.findAllHealthRecords);
  // router.get("/:id", healthRecordController.findHealthRecordById);
  router.post("/", healthRecordController.createHealthRecord);
  router.delete("/:id", healthRecordController.deleteHealthRecordById)
  router.put("/:id", healthRecordController.updateHealthRecord);

  app.use("/api/healthRecord", router); // Corrected spelling of "healthRecord"
};
