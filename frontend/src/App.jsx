// import "./App.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Navbar from "./components/Navbar";
import Appointments from "./pages/Appointments";
import BookAppointment from "./pages/BookAppointment";
import Home from "./pages/Home";
import Doctors from "./pages/Doctors";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/doctors" element={<Doctors />} />
          <Route path="/appointments" element={<Appointments />} />
          <Route path="/book-appointment/:id" element={<BookAppointment />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
