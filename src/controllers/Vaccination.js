const Vaccination = require("../models/Vaccination");
const Diseases = require("../models/Disease");

exports.createVaccination = async (req, res) => {
  const { nameOfVaccine, origin, dateTime, location, symptoms, disease } =
    req.body;

  const vaccination = new Vaccination({
    nameOfVaccine,
    origin,
    dateTime,
    location,
    symptoms,
    disease,
  });

  vaccination
    .save(vaccination)
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(500).json({
        message:
          err.message || "Some error occurred while creating the Vaccination.",
      });
    });
};

exports.updateVaccination = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await Vaccination.findByIdAndUpdate(id, req.body);
    if (!data) {
      res.status(404).send({
        message: `Cannot update Vaccination with id=${id}`,
      });
    } else res.send({ message: "Vaccination was updated successfully." });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteVaccinationById = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await Vaccination.findByIdAndRemove(id, {
      useFindAndModify: false,
    });
    if (!data) {
      res.status(404).json({ error: "Vaccination not found to delete" });
    } else {
      res.status(200).json({ message: "Delete Vaccination successfully" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.findVaccinationById = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await Vaccination.findById(id).populate("Disease").exec();
    if (!data) {
      res.status(404).send({
        message: `Cannot Find Vaccination with id=${id}`,
      });
    } else res.status(200).json(data);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

exports.findVaccinationByDisease = async (req, res) => {
  Diseases.findById(req.params.id)
    .then(
      (data) => {
        if (data != null) {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json(data.vaccination);
        } else {
          err = new Error("Vaccination " + req.params.id + " not found");
          err.status = 404;
          return next(err);
        }
      },
      (err) => next(err)
    )
    .catch((err) => next(err));
};

exports.findAllVaccination = async (req, res) => {
  try {
    const vaccination = await Vaccination.find({}).populate("Disease").exec();
    res.status(200).json(vaccination);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};
