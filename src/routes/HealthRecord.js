module.exports = (app) => {
    const healthRecordController = require("../controllers/HealthRecord");
  
    var router = require("express").Router();
  
    router.get("/", healthRecordController.findAllHealthRecords);
    router.get("/:id", healthRecordController.findHealthRecordById);
    router.post("/", healthRecordController.createHealthRecord);
    router.put("/:id", healthRecordController.updateHealthRecord);
    router.delete("/:id", healthRecordController.deleteHealthRecordById);
  
    app.use("/api/heathRecord", router);
  };
