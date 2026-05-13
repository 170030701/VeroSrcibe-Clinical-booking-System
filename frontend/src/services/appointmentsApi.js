export const createAppointment = async (appointmentData) => {
  try {
    const response = await fetch("http://localhost:5000/api/appointments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(appointmentData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to book appointment");
    }

    // Return the newly created appointment object from MongoDB
    return await response.json();
  } catch (error) {
    console.error("API Error in createAppointment:", error.message);
    throw error;
  }
};

export const updateAppointmentStatus = async ({ id, status }) => {
  const response = await fetch(`http://localhost:5000/api/appointments/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ status }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to update status");
  }

  return await response.json();
};

const getData = async (api) => {
  const data = await fetch(api);
  const json = await data.json();
  return json;
};

export const getDoctors = () => getData("http://localhost:5000/api/doctors");
export const getAppointments = () =>
  getData("http://localhost:5000/api/appointments");
