const express = require('express');
const HealthRecord = require('../models/HealthRecord');
const MedicalHistory = require('../models/MedicalHistory');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const healthRecords = await HealthRecord.find({})
      .populate('user')
      .populate('medicalHistories')
      .exec();
    res.status(200).json(healthRecords);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

router.get('/:id/medicalHistories', async (req, res) => {
  HealthRecord.findById(req.params.id)
    .populate('medicalHistories')
    .then(
      (data) => {
        if (data != null) {
          res.status(200).json(data.medicalHistories);
        } else {
          const err = new Error(`Medical Histories for Health Record ${req.params.id} not found`);
          err.status = 404;
          return next(err);
        }
      },
      (err) => next(err)
    )
    .catch((err) => next(err));
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const healthRecord = await HealthRecord.findById(id)
      .populate('user')
      .populate('medicalHistories')
      .exec();
    if (!healthRecord) {
      res.status(404).send({
        message: `Cannot find Health Record with id=${id}`,
      });
    } else res.status(200).json(healthRecord);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// Add other routes for creating, updating, and deleting health records if needed

module.exports = (app) => {
  app.use('/api/healthRecords', router);
};
