import { useNavigate } from "react-router-dom";

const DoctorCard = ({
  image,
  name,
  specialty,
  availableDays,
  _id,
  timeSlots,
}) => {
  const navigate = useNavigate();
  return (
    <div className="border rounded p-2">
      <img className="w-full h-48" src={image} alt={name} />
      <div className="text-start mt-1 text-white">
        <h3 className="font-medium">{name}</h3>
        <p className="text-sm">{specialty}</p>
        <p className="text-xs">Availability: {availableDays?.join(", ")}</p>
        <div className="flex justify-end my-2 ">
          <button
            className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 cursor-pointer"
            // navigates to booking page with doctor details and we are passing doctor details in state so that we can access it in booking page without making an api call
            onClick={() =>
              navigate(`/book-appointment/${_id}`, {
                state: {
                  doctor: { name, specialty, availableDays, _id, timeSlots },
                },
              })
            }
          >
            Book Appointment
          </button>
        </div>
      </div>
    </div>
  );
};

export default DoctorCard;
