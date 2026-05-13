require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db.js");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

const doctorRoutes = require("./routes/doctor.routes");
const appointmentRoutes = require("./routes/appointment.routes");
const { seedDoctors } = require("./controllers/doctor.controller");

connectDB().then(() => {
  // Seed doctors immediately after a successful connection
  seedDoctors();
});

//middlewares
app.use(cors()); // Enables CORS for all routes
app.use(express.json()); //Parses incoming JSON

app.use("/api/doctors", doctorRoutes);
app.use("/api/appointments", appointmentRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
