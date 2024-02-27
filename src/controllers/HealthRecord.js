// controllers/HealthRecord.js
const HealthRecord = require("../models/HealthRecord");

exports.createHealthRecord = async (req, res) => {
  const { name, age, gender, relationshipType, userId } = req.body;

  try {
    const healthRecord = new HealthRecord({
      name,
      age,
      gender,
      relationshipType,
      user: userId,
    });

    await healthRecord.save();

    res.status(200).json(healthRecord);
  } catch (err) {
    res.status(500).json({
      message:
        err.message || "Some error occurred while creating the HealthRecord.",
    });
  }
};

exports.updateHealthRecord = async (req, res) => {
  const { id } = req.params;

  try {
    const data = await HealthRecord.findByIdAndUpdate(id, req.body);
    if (!data) {
      return res.status(404).send({
        message: `Cannot update HealthRecord with id=${id}`,
      });
    }
    res.send({ message: "HealthRecord was updated successfully." });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteHealthRecordById = async (req, res) => {
  const { id } = req.params;

  try {
    const data = await HealthRecord.findByIdAndRemove(id, {
      useFindAndModify: false,
    });

    if (!data) {
      return res.status(404).json({ error: "HealthRecord not found to delete" });
    }

    res.status(200).json({ message: "Delete HealthRecord successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.findHealthRecordById = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await HealthRecord.findById(id)
      .populate("user")
      .populate("basicInfo")
      .populate("medicalHistories")
      .populate("appointments")
      .populate("diseases")
      .exec();

    if (!data) {
      return res.status(404).send({
        message: `Cannot Find HealthRecord with id=${id}`,
      });
    }
    res.status(200).json(data);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

exports.findAllHealthRecords = async (req, res) => {
  try {
    const healthRecords = await HealthRecord.find({})
      .populate("user")
      .populate("basicInfo")
      .populate("medicalHistories")
      .populate("appointments")
      .populate("diseases")
      .exec();

    res.status(200).json(healthRecords);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};
