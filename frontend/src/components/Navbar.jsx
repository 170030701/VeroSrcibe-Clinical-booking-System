import { NavLink } from "react-router-dom"; // 1. Change Link to NavLink

const Navbar = () => {
  return (
    <nav className="flex justify-between px-3 pt-4 mb-2">
      <h3>
        <NavLink to="/" className="text-purple-500 text-2xl font-bold">
          Vero Scribe
        </NavLink>
      </h3>
      <div className="flex items-center">
        <NavLink
          to="/doctors"
          className={({ isActive }) =>
            `px-4 font-medium transition-all text-white ${isActive ? "underline  decoration-purple-500 decoration-2 underline-offset-4" : ""}`
          }
        >
          Book Appointment
        </NavLink>

        <NavLink
          to="/appointments"
          className={({ isActive }) =>
            `pe-3 font-medium transition-all text-white ${isActive ? "underline decoration-purple-500 decoration-2 underline-offset-4" : ""}`
          }
        >
          Appointments
        </NavLink>
      </div>
    </nav>
  );
};

export default Navbar;
