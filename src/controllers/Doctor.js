const Doctor = require("../models/Doctor");

exports.findAllDoctors = async (req, res) => {
  try {
    const doctor = await Doctor.find({}).populate("user").exec();
    res.status(200).json(doctor);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

exports.findDoctorById = async (req, res) => {
  try {
    const data = await Doctor.findById(req.params.id).populate("user").exec();
    if (!data) {
      res.status(404).send({
        message: `Cannot Find doctor with id=${id}`,
      });
    } else res.status(200).json(data);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

exports.createDoctor = async (req, res) => {
  const { name, department, phone, address, status, user } = req.body;

  const doctor = new Doctor({
    name,
    department,
    phone,
    address,
    status,
    user,
  });

  doctor
    .save(doctor)
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(500).json({
        message:
          err.message || "Some error occurred while creating the Doctor.",
      });
    });
};

exports.updateDoctor = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await Doctor.findByIdAndUpdate(id, req.body);
    if (!data) {
      res.status(404).send({
        message: `Cannot update Doctor with id=${id}`,
      });
    } else res.send({ message: "Doctor was updated successfully." });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteDoctorbyId = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await Doctor.findByIdAndRemove(id, {
      useFindAndModify: false,
    });
    if (!data) {
      res.status(404).json({ error: "Doctor not found to delete" });
    } else {
      res.status(200).json({ message: "Delete Doctor successfully" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
