import { useQuery } from "@tanstack/react-query";
import DoctorCard from "../components/DoctorCard";
import { getDoctors } from "../services/appointmentsApi";
import { Spin } from "antd";
import Loader from "../components/Loader";
const Doctors = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["doctors"],
    queryFn: getDoctors,
    staleTime: 10 * 60 * 60 * 1000, // cache the data for 10 minutes in milliseconds
  });

  if (!isLoading && data?.length === 0) {
    return (
      <div className="w-full h-[60vh] flex items-center justify-center">
        <h3 className="text-white text-xl">
          No doctors available at the moment. Please check back later.
        </h3>
      </div>
    );
  }

  if (!isLoading && isError) {
    return (
      <div className="w-full h-[60vh] flex items-center justify-center">
        <h3 className="text-white text-xl">
          Oops! Something went wrong while fetching doctors. Please try again
          later.
        </h3>
      </div>
    );
  }

  return (
    <div>
      <h3 className="text-2xl font-bold text-white mt-2 mb-4">
        Book an appointment with one of our doctors
      </h3>
      {isLoading ? (
        <Loader></Loader>
      ) : (
        <div className="grid grid-cols-1 p-4 md:grid-cols-2 md:gap-3 lg:grid-cols-3 gap-4">
          {data?.map((doctor) => (
            <DoctorCard key={doctor._id} {...doctor} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Doctors;
