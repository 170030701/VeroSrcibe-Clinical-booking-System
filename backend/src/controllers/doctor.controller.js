const Doctor = require("../models/doctor.model");

const getDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find();
    res.status(200).json(doctors);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const seedDoctors = async () => {
  try {
    const count = await Doctor.countDocuments();

    // Only seed if the Doctor collection is completely empty
    if (count === 0) {
      const defaultDoctors = [
        {
          name: "Dr. Adeel Sheikh",
          specialty: "General Practitioner",
          image:
            "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=300",
          availableDays: ["Monday", "Tuesday", "Wednesday"],
          timeSlots: ["09:00 AM", "10:30 AM", "01:00 PM", "03:30 PM"],
        },
        {
          name: "Dr. Sarah Jenkins",
          specialty: "Pediatrician",
          image:
            "https://images.unsplash.com/photo-1594824813573-246434de83fb?auto=format&fit=crop&q=80&w=300",
          availableDays: ["Wednesday", "Thursday", "Friday"],
          timeSlots: ["10:00 AM", "11:30 AM", "02:00 PM", "04:30 PM"],
        },
        {
          name: "Dr. Marcus Vance",
          specialty: "Cardiologist",
          image:
            "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=300",
          availableDays: ["Monday", "Thursday"],
          timeSlots: ["09:00 AM", "11:00 AM", "01:30 PM", "03:00 PM"],
        },
        {
          name: "Dr. Priya Patel",
          specialty: "Dermatologist",
          image:
            "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=300",
          availableDays: ["Tuesday", "Friday"],
          timeSlots: ["09:30 AM", "11:30 AM", "02:30 PM", "04:00 PM"],
        },
        {
          name: "Dr. Michael Chen",
          specialty: "Neurologist",
          image:
            "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=300",
          availableDays: ["Monday", "Wednesday", "Thursday"],
          timeSlots: ["08:30 AM", "10:00 AM", "01:00 PM", "02:30 PM"],
        },
      ];

      await Doctor.create(defaultDoctors);
      console.log("Database seeded successfully with default doctors!");
    }
  } catch (error) {
    console.error(`Error seeding doctors: ${error.message}`);
  }
};

module.exports = {
  getDoctors,
  seedDoctors,
};
