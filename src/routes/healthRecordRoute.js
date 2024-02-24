const express = require('express');
const router = express.Router();
const HealthRecord = require('../models/healthRecord');

// Create a new health record
router.post('/', async (req, res) => {
  try {
    const healthRecord = await HealthRecord.create(req.body);
    res.status(201).json(healthRecord);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get all health records
router.get('/', async (req, res) => {
  try {
    const healthRecords = await HealthRecord.find({});
    res.json(healthRecords);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a specific health record
router.get('/:id', getHealthRecord, (req, res) => {
  res.json(res.healthRecord);
});

// Update a health record
router.patch('/:id', getHealthRecord, async (req, res) => {
  if (req.body.name != null) {
    res.healthRecord.name = req.body.name;
  }
  if (req.body.age != null) {
    res.healthRecord.age = req.body.age;
  }
  if (req.body.gender != null) {
    res.healthRecord.gender = req.body.gender;
  }
  if (req.body.relationshipType != null) {
    res.healthRecord.relationshipType = req.body.relationshipType;
  }
  if (req.body.userId != null) {
    res.healthRecord.userId = req.body.userId;
  }
  if (req.body.basicInforId != null) {
    res.healthRecord.basicInforId = req.body.basicInforId;
  }
  if (req.body.medicalHistoryId != null) {
    res.healthRecord.medicalHistoryId = req.body.medicalHistoryId;
  }
  if (req.body.appointmentId != null) {
    res.healthRecord.appointmentId = req.body.appointmentId;
  }
  if (req.body.diseaseId != null) {
    res.healthRecord.diseaseId = req.body.diseaseId;
  }
  if (req.body.bloodIndex != null) {
    res.healthRecord.bloodIndex = req.body.bloodIndex;
  }
  res.healthRecord.updatedAt = Date.now();

  try {
    const updatedHealthRecord = await res.healthRecord.save();
    res.json(updatedHealthRecord);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a health record
router.delete('/:id', getHealthRecord, async (req, res) => {
  try {
    await res.healthRecord.remove();
    res.json({ message: 'Health record deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Middleware function to get a health record by ID
async function getHealthRecord(req, res, next) {
  try {
    const healthRecord = await HealthRecord.findById(req.params.id);
    if (healthRecord == null) {
      return res.status(404).json({ message: 'Cannot find health record' });
    }
    res.healthRecord = healthRecord;
    next();
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}

module.exports = router;
