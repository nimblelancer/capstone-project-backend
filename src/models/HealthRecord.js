const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const HealthRecordSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
    min: 0, // Assuming age cannot be negative
  },
  gender: {
    type: String,
    enum: ['M', 'F', 'Other'], // Or your desired gender categories
  },
  relationshipType: { // Assuming 'type_relative' clarification
    type: String,
    required: true,
  },
  // Reference to User model (assuming one-to-one relationship)
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  basicInforId: {
    type: Schema.Types.ObjectId,
    ref: 'BasicInfor',
  },
  medicalHistoryId: {
    type: Schema.Types.ObjectId,
    ref: 'MedicalHistory',
  },
  appointmentId: {
    type: Schema.Types.ObjectId,
    ref: 'Appointment',
  },
  vaccineId: {
    type: Schema.Types.ObjectId,
    ref: 'Vaccine',
  },
  bloodIndex: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model('HealthRecord', HealthRecordSchema);