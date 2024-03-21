const mongoose = require("mongoose");
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
    // enum: ["M", "F", "Other"], // Or your desired gender categories
    required: true,
  },
  relationshipType: {
    // Assuming 'type_relative' clarification
    type: String,
    required: true,
  },
  // Reference to User model (assuming one-to-one relationship)
  // user: {
  //   // type: Schema.Types.ObjectId,
  //   type: String,
  //   ref: "User",
  //   required: true,
  // },
  // basicInfo: [{
  //   type: Schema.Types.ObjectId,
  //   ref: "BasicInfo",
  // }],
  // medicalHistories: [
  //  {
  //     type: Schema.Types.ObjectId,
  //     ref: "MedicalHistory",
  //   },
  // ],
  // appointments: [
  //   {
  //     type: Schema.Types.ObjectId,
  //     ref: "Appointment",
  //   },
  // ],
  // diseases: [
  //   {
  //     type: Schema.Types.ObjectId,
  //     ref: "Disease",
  //   },
  // ],
  // bloodIndex: {
  //   type: String,
  // },
  // createdAt: {
  //   type: Date,
  //   default: Date.now,
  // },
  // updatedAt: {
  //   type: Date,
  //   default: Date.now,
  // },
  // isDeleted: {
  //   type: Boolean,
  //   default: false,
  // },
});

module.exports = mongoose.model("HealthRecord", HealthRecordSchema);
