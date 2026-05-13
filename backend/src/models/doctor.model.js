const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Doctor name is required"],
      trim: true,
    },
    specialty: {
      type: String,
      required: [true, "Specialty is required"],
      trim: true,
    },
    image: {
      type: String, // You can store a URL or a public image path for a placeholder
    },
    availableDays: {
      type: [String], // e.g., ["Monday", "Wednesday", "Friday"]
      required: true,
    },
    timeSlots: {
      type: [String], // e.g., ["09:00 AM", "10:30 AM", "01:00 PM", "03:30 PM"]
      required: true,
    },
  },
  {
    timestamps: true, // Automatically creates createdAt and updatedAt fields
  },
);

module.exports = mongoose.model("Doctor", doctorSchema);
