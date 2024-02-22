const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MedicalHistorySchema = new Schema({
  // Basic details
  location: {
    type: String,
    required: true,
  },
  dateTime: {
    type: Date,
    required: true,
  },
  diseaseName: {
    type: String,
    required: true,
  },

  // Relationship with HealthRecord (assuming one-to-many)
  healthRecordId: {
    type: Schema.Types.ObjectId,
    ref: 'HealthRecord',
    required: true,
  },

  // Medical details
  symptoms: {
    type: String,
    required: true,
  },
  faculty: { // Assuming department or specialization
    type: String,
    required: true,
  },
  doctorName: {
    type: String,
    required: true,
  },

  // Attachments (consider data security and storage implications)
  ultrasoundScanImg: { // Adjust field type and validation based on storage method
    type: String, // Or Buffer?
    default: '',
  },
  diagnosticImg: { // Adjust field type and validation based on storage method
    type: String, // Or Buffer?
    default: '',
  },

  // Treatment details
  prescriptions: {
    type: [String], // Array of medication names or description
    default: [],
  },
  totalMoney: {
    type: Number,
    min: 0, // Enforce non-negative cost values
    default: 0,
  },

  // Timestamps
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },

  // Soft delete flag
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

// Update timestamps on document modification
MedicalHistorySchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('MedicalHistory', MedicalHistorySchema);