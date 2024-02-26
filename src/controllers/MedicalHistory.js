const MedicalHistory = require("../models/MedicalHistory");
const HealthRecord = require("../models/HealthRecord");

exports.findAllMedicalHistories = async (req, res) => {
  try {
    const medicalHistory = await MedicalHistory.find({})
      .populate("healthRecord")
      .exec();
    res.status(200).json(medicalHistory);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

exports.findMedicalHistoryByHealthRecord = async (req, res) => {
  HealthRecord.findById(req.params.id)
    .then(
      (data) => {
        if (data != null) {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json(data.medicalHistories);
        } else {
          err = new Error("Medical History " + req.params.id + " not found");
          err.status = 404;
          return next(err);
        }
      },
      (err) => next(err)
    )
    .catch((err) => next(err));
};

exports.findMedicalHistoryById = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await MedicalHistory.findById(id)
      .populate("healthRecord")
      .exec();
    if (!data) {
      res.status(404).send({
        message: `Cannot Find MedicalHistory with id=${id}`,
      });
    } else res.status(200).json(data);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

exports.createMedicalHistory = async (req, res) => {
  const {
    location,
    dateTime,
    diseaseName,
    symptoms,
    faculty,
    doctorName,
    ultrasoundScanImg,
    diagnosticImg,
    prescriptions,
    totalMoney,
    healthRecord,
  } = req.body;

  const medicalHistory = new MedicalHistory({
    location,
    dateTime,
    diseaseName,
    symptoms,
    faculty,
    doctorName,
    ultrasoundScanImg,
    diagnosticImg,
    prescriptions,
    totalMoney,
    healthRecord,
  });

  medicalHistory
    .save(medicalHistory)
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(500).json({
        message:
          err.message ||
          "Some error occurred while creating the Medical History.",
      });
    });
};

exports.updateMedicalHistory = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await MedicalHistory.findByIdAndUpdate(id, req.body);
    if (!data) {
      res.status(404).send({
        message: `Cannot update Medical History with id=${id}`,
      });
    } else res.send({ message: "Medical History was updated successfully." });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteMedicalHistorybyId = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await MedicalHistory.findByIdAndRemove(id, {
      useFindAndModify: false,
    });
    if (!data) {
      res.status(404).json({ error: "Medical History not found to delete" });
    } else {
      res.status(200).json({ message: "Delete Medical History successfully" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
