const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DiseaseSchema = new Schema({
  // Disease details
  name: {
    type: String,
    required: true,
  },
  // Injection and medication relationship (assuming one-to-many)
  totalOfInjection: {
    type: Number,
    default: 0,
    min: 0, // Enforce non-negative injection count
  },
  vaccinationId: [{
    type: Schema.Types.ObjectId,
    ref: 'Vaccination', // Replace with actual schema name
    required: true,
  }],

  // Relationship with HealthRecord (assuming one-to-many)
  healthRecordId: {
    type: Schema.Types.ObjectId,
    ref: 'HealthRecord', // Replace with actual schema name
    required: true,
  },

  // Optional additional fields
  symptoms: {
    type: [String], // Array of symptom descriptions
    default: [],
  },
//   treatment: {
//     type: String, // Brief description of treatment
//   },
//   recommendations: {
//     type: String, // Recommendations for prevention or management
//   },
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
DiseaseSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Disease', DiseaseSchema);