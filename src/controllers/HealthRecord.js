// controllers/HealthRecord.js
const HealthRecord = require("../models/HealthRecord");

exports.createHealthRecord = async (req, res) => {
  try {
    console.log(req.body); // Log the request body to see its content

    const { name, age, gender, relationshipType, /*userId*/ } = req.body;

    if (!name || !age || !gender || !relationshipType /* ||!userId*/) {
      return res.status(400).json({ error: "Missing required fields in request body" });
    }

    const healthRecord = new HealthRecord({
      name,
      age,
      gender,
      relationshipType,
      // user: userId,
    });

    await healthRecord.save();

    res.status(201).json(healthRecord);
  } catch (err) {
    console.error("Error creating health record:", err);
    res.status(500).json({
      error: "An error occurred while creating the health record",
    });
  }
};


exports.updateHealthRecord = async (req, res) => {
  const { id } = req.params;

  try {
    const updatedRecord = await HealthRecord.findByIdAndUpdate(id, req.body, { new: true });

    if (!updatedRecord) {
      return res.status(404).send({
        message: `Cannot update HealthRecord with id=${id}`,
      });
    }

    res.status(200).json(updatedRecord);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.deleteHealthRecordById = async (req, res) => {
  const { id } = req.params;

  try {
    const data = await HealthRecord.findOneAndDelete({ _id: id });

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
    const healthRecords = await HealthRecord.find({}).exec();

    res.status(200).json(healthRecords);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};
// exports.findAllHealthRecords = async (req, res) => {
//   try {
//     const healthRecords = await HealthRecord.find({})
//       .populate("user")
//       .populate("basicInfo")
//       .populate("medicalHistories")
//       .populate("appointments")
//       .populate("diseases")
//       .exec();

//     res.status(200).json(healthRecords);
//   } catch (e) {
//     res.status(500).json({ error: e.message });
//   }
// };
