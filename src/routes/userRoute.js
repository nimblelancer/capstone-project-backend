const express = require('express');
const User = require('../models/User');
const HealthRecord = require('../models/HealthRecord');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const users = await User.find({})
      .populate('healthRecordId')
      .exec();
    res.status(200).json(users);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

router.get('/:id/healthRecords', async (req, res) => {
  User.findById(req.params.id)
    .populate('healthRecordId')
    .then(
      (data) => {
        if (data != null) {
          res.status(200).json(data.healthRecordId);
        } else {
          const err = new Error(`Health Records for User ${req.params.id} not found`);
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
    const user = await User.findById(id)
      .populate('healthRecordId')
      .exec();
    if (!user) {
      res.status(404).send({
        message: `Cannot find User with id=${id}`,
      });
    } else res.status(200).json(user);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// Add other routes for creating, updating, and deleting users if needed

module.exports = (app) => {
  app.use('/api/users', router);
};
