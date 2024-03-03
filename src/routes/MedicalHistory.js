module.exports = (app) => {
  const medicalHistory = require("../controllers/MedicalHistory");

  var router = require("express").Router();

  router.get("/healthRecord", medicalHistory.findMedicalHistoryByHealthRecord);
  router.get("/", medicalHistory.findAllMedicalHistories);
  router.get("/:id", medicalHistory.findMedicalHistoryById);

  router.post("/", medicalHistory.createMedicalHistory);
  router.put("/:id", medicalHistory.updateMedicalHistory);
  router.delete("/:id", medicalHistory.deleteMedicalHistorybyId);

  app.use("/api/mehis", router);
};
