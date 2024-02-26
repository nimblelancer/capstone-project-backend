const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const VaccinationSchema = new Schema({
  // Vaccination details
  nameOfVaccine: {
    type: String,
    required: true,
  },
  origin: {
    type: String,
    required: true,
  },
  dateTime: {
    type: Date,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  symptoms: {
    type: [String], // Array of potential side effect descriptions
    default: [],
  },

  // Relationship with Disease (assuming one-to-many)
  disease: {
    type: Schema.Types.ObjectId,
    ref: 'Disease', // Replace with actual schema name
    required: true,
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
VaccinationSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Vaccination', VaccinationSchema);