const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BasicInforSchema = new Schema({
  // Measurement fields
  height: {
    type: Number,
    required: true,
    min: 0, // Enforce non-negative height values
  },
  bloodPressure: {
    type: String,
    required: true,
    // Consider using a separate schema for complex blood pressure data
    // if needed (e.g., systolic/diastolic values)
  },
  temperature: {
    type: Number,
    required: true,
    // Specify temperature unit (e.g., Celsius, Fahrenheit)
  },
  weight: {
    type: Number,
    required: true,
    min: 0, // Enforce non-negative weight values
  },
  bloodSugar: {
    type: Number,
    required: true,
    // Indicate measurement unit (e.g., mg/dL)
  },
  heartRate: {
    type: Number,
    required: true,
    min: 0, // Enforce non-negative heart rate values
  },
  bmiIndex: {
    type: Number,
    // Consider calculating BMI automatically based on height and weight
    // if appropriate
  },
  // Relationship with HealthRecord (assuming one-to-one)
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
  isDeleted: {
    type: Boolean,
    default: false,
  },
});
BasicInforSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('BasicInfor', BasicInforSchema);