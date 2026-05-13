const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema(
  {
    doctor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Doctor", // This references our Doctor model for .populate()
      required: [true, "An appointment must be linked to a doctor"],
    },
    patientName: {
      type: String,
      required: [true, "Patient name is required"],
      trim: true,
    },
    patientEmail: {
      type: String,
      required: [true, "Patient email is required"],
      trim: true,
      lowercase: true,
    },
    reasonForVisit: {
      type: String,
      required: [true, "Reason for visit is required"],
      trim: true,
    },
    appointmentDate: {
      type: Date, // Standard date object
      required: [true, "Appointment date is required"],
    },
    appointmentTime: {
      type: String, // e.g., "10:30 AM"
      required: [true, "Appointment time is required"],
    },
    status: {
      type: String,
      enum: ["Pending", "Confirmed", "Cancelled"],
      default: "Pending", // All new bookings are submitted as "Pending"
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Appointment", appointmentSchema);
