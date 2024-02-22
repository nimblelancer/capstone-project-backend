JavaScript
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AppointmentSchema = new Schema({
  // Basic appointment details
  name: {
    type: String,
    required: true,
  },
  department: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['Pending', 'Confirmed', 'Completed', 'Cancelled'],
    default: 'Pending',
  },

  // Relationship with User (assuming one-to-many)
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
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