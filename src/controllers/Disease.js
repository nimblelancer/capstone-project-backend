const Disease = require("../models/Disease");

exports.createDisease = async (req, res) => {
  const { name, totalOfInjection, vaccination, healthRecord, symptoms } = req.body;

  const disease = new Disease({
    name,
    totalOfInjection,
    vaccination,
    healthRecord,
    symptoms,
  });

  disease
  .save(disease)
  .then((data) => {
    res.status(200).json(data);
  })
  .catch((err) => {
    res.status(500).json({
      message:
        err.message || "Some error occurred while creating the Disease.",
    });
  });
};

exports.updateDisease = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedDisease = await Disease.findByIdAndUpdate(id, req.body);
    if (!updatedDisease) {
      res.status(404).send({
        message: `Cannot update Disease with id=${id}`,
      });
    } else {
      res.status(200).json({ message: "Disease was updated successfully." });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteDiseaseById = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedDisease = await Disease.findByIdAndRemove(id, {
      useFindAndModify: false,
    });
    if (!deletedDisease) {
      res.status(404).json({ error: "Disease not found to delete" });
    } else {
      res.status(200).json({ message: "Delete Disease successfully" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.findDiseaseById = async (req, res) => {
  const { id } = req.params;
  try {
    const disease = await Disease.findById(id);
    if (!disease) {
      res.status(404).send({
        message: `Cannot Find Disease with id=${id}`,
      });
    } else {
      res.status(200).json(disease);
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.findAllDiseases = async (req, res) => {
  try {
    const diseases = await Disease.find({});
    res.status(200).json(diseases);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
exports.findDiseaseByHealthRecord = async (req, res) => {
    HealthRecord.findById(req.params.id)
      .then(
        (data) => {
          if (data != null) {
            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json");
            res.json(data.diseases);
          } else {
            err = new Error("Disease " + req.params.id + " not found");
            err.status = 404;
            return next(err);
          }
        },
        (err) => next(err)
      )
      .catch((err) => next(err));
  };