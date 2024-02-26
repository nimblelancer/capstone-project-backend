const Appointment = require("../models/Appointment");
const HealthRecord = require("../models/HealthRecord");

exports.createAppointment = async (req, res) => {
  const { location, dateTime, type, healthRecord } = req.body;

  const appointment = new Appointment({
    location,
    dateTime,
    type,
    healthRecord,
  });

  appointment
    .save(appointment)
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(500).json({
        message:
          err.message || "Some error occurred while creating the Appointment.",
      });
    });
};

exports.updateAppointment = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await Appointment.findByIdAndUpdate(id, req.body);
    if (!data) {
      res.status(404).send({
        message: `Cannot update Appointment with id=${id}`,
      });
    } else res.send({ message: "Appointment was updated successfully." });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteAppointmentById = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await Appointment.findByIdAndRemove(id, {
      useFindAndModify: false,
    });
    if (!data) {
      res.status(404).json({ error: "Appointment not found to delete" });
    } else {
      res.status(200).json({ message: "Delete Appointment successfully" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.findAppointmentById = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await Appointment.findById(id).populate("HealthRecord").exec();
    if (!data) {
      res.status(404).send({
        message: `Cannot Find Appointment with id=${id}`,
      });
    } else res.status(200).json(data);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

exports.findAppointmentByHealthRecord = async (req, res) => {
  HealthRecord.findById(req.params.id)
    .then(
      (data) => {
        if (data != null) {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json(data.appointments);
        } else {
          err = new Error("Appointment " + req.params.id + " not found");
          err.status = 404;
          return next(err);
        }
      },
      (err) => next(err)
    )
    .catch((err) => next(err));
};

exports.findAllAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.find({})
      .populate("HealthRecord")
      .exec();
    res.status(200).json(appointment);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};
