const express = require("express");
const router = express.Router();
const {
  createAppointment,
  getAppointments,
  updateAppointmentStatus,
} = require("../controllers/appointment.controller");

// POST /api/appointments -> Patient books an appointment
router.post("/", createAppointment);

// GET /api/appointments -> Admin gets all appointments
router.get("/", getAppointments);

// PATCH /api/appointments/:id -> Admin confirms/cancels an appointment
router.patch("/:id", updateAppointmentStatus);

module.exports = router;
