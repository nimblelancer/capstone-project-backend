
const express = require("express");
const router = express.Router();
const healthRecordController = require("../controllers/HealthRecord");

router.get("/", healthRecordController.findAllHealthRecords);
router.get("/:id", healthRecordController.findHealthRecordById);
router.post("/", healthRecordController.createHealthRecord);
router.put("/:id", healthRecordController.updateHealthRecord);
router.delete("/:id", healthRecordController.deleteHealthRecordById);

module.exports = router;
