const BasicInfo = require("../models/BasicInfo");

exports.createBasicInfo = async (req, res) => {
  const { height, bloodPressure, temperature, weight, bloodSugar, heartRate, bmiIndex, healthRecord } = req.body;

  const basicInfo = new BasicInfo({
    height,
    bloodPressure,
    temperature,
    weight,
    bloodSugar,
    heartRate,
    bmiIndex,
    healthRecord,
  });

  try {
    const data = await basicInfo.save();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({
      message: err.message || "Some error occurred while creating the BasicInfo.",
    });
  }
};

exports.updateBasicInfo = async (req, res) => {
  const { basicInfoId } = req.params;
  try {
    const data = await BasicInfo.findByIdAndUpdate(basicInfoId, req.body, { new: true });
    if (!data) {
      res.status(404).json({ message: `Cannot update BasicInfo with id=${basicInfoId}` });
    } else {
      res.status(200).json({ message: "BasicInfo was updated successfully." });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteBasicInfoById = async (req, res) => {
  const { basicInfoId } = req.params;
  try {
    const data = await BasicInfo.findByIdAndRemove(basicInfoId);
    if (!data) {
      res.status(404).json({ message: `BasicInfo with id=${basicInfoId} not found` });
    } else {
      res.status(200).json({ message: "BasicInfo deleted successfully" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.findBasicInfoById = async (req, res) => {
  const { basicInfoId } = req.params;
  try {
    const data = await BasicInfo.findById(basicInfoId);
    if (!data) {
      res.status(404).json({ message: `BasicInfo with id=${basicInfoId} not found` });
    } else {
      res.status(200).json(data);
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.findBasicInfoByHealthRecord = async (req, res) => {
  const { healthRecordId } = req.params;
  try {
    const data = await BasicInfo.find({ healthRecord: healthRecordId });
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.findAllBasicInfos = async (req, res) => {
  try {
    const basicInfos = await BasicInfo.find({});
    res.status(200).json(basicInfos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
