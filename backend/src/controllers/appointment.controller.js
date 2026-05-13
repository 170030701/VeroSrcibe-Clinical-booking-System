const Appointment = require("../models/appointment.model");

const createAppointment = async (req, res) => {
  try {
    const {
      doctor,
      patientName,
      patientEmail,
      reasonForVisit,
      appointmentDate,
      appointmentTime,
    } = req.body;

    if (
      !doctor ||
      !patientName ||
      !patientEmail ||
      !reasonForVisit ||
      !appointmentDate ||
      !appointmentTime
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newAppointment = new Appointment({
      doctor,
      patientName,
      patientEmail,
      reasonForVisit,
      appointmentDate,
      appointmentTime,
      status: "Pending", // Always defaults to Pending
    });

    const savedAppointment = await newAppointment.save();
    res.status(201).json(savedAppointment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find()
      .populate("doctor") // Swaps the doctor ID with the actual Doctor object details
      .sort({ createdAt: -1 }); // Newest requests show at the top

    res.status(200).json(appointments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateAppointmentStatus = async (req, res) => {
  try {
    const { status } = req.body;

    // Validate incoming status value
    if (!["Pending", "Confirmed", "Cancelled"].includes(status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }

    const updatedAppointment = await Appointment.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }, // Return the updated document and run Mongoose schema checks
    ).populate("doctor");

    if (!updatedAppointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    res.status(200).json(updatedAppointment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  createAppointment,
  getAppointments,
  updateAppointmentStatus,
};
