module.exports = (app) => {
  const diseaseController = require("../controllers/Disease");
  const { authorizeAdmin } = require("../middlewares/authentication"); // Import authorizeAdmin middleware
  var router = require("express").Router();

  router.get("/healthRecord", diseaseController.findDiseaseByHealthRecord);
  router.get("/", diseaseController.findAllDiseases);
  router.get("/:id", diseaseController.findDiseaseById);

  router.post("/", diseaseController.createDisease); 
  router.put("/:id", diseaseController.updateDisease);
  router.delete("/:id", diseaseController.deleteDiseaseById);

  app.use("/api/disease", router);
};
