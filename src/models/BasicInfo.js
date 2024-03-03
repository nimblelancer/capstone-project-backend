const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BasicInfoSchema = new Schema({
  // Measurement fields
  height: {
    type: Number,
    min: 0, // Enforce non-negative height values
  },
  bloodPressure: {
    type: String,
    // Consider using a separate schema for complex blood pressure data
    // if needed (e.g., systolic/diastolic values)
  },
  temperature: {
    type: Number,
    // Specify temperature unit (e.g., Celsius, Fahrenheit)
  },
  weight: {
    type: Number,
    min: 0, // Enforce non-negative weight values
  },
  bloodSugar: {
    type: Number,
    // Indicate measurement unit (e.g., mg/dL)
  },
  heartRate: {
    type: Number,
    min: 0, // Enforce non-negative heart rate values
  },
  bmiIndex: {
    type: Number,
    // Consider calculating BMI automatically based on height and weight
    // if appropriate
  },
  // Relationship with HealthRecord (assuming one-to-one)
  healthRecord: {
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
BasicInfoSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('BasicInfo', BasicInfoSchema);