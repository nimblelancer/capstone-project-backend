const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AppointmentSchema = new Schema({
  // Basic appointment details
  location: {
    type: String,
    required: true,
  },
  dateTime: {
    type: Date,
    required: true,
  },
  type: {
    type: String,
    required: true,
    // Consider adding enum for valid appointment types
  },

  // Relationship with HealthRecord (assuming one-to-many)
  healthRecordId: {
    type: Schema.Types.ObjectId,
    ref: 'HealthRecord',
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
AppointmentSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Appointment', AppointmentSchema);