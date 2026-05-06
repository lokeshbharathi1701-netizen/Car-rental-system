/* Main App Component - Sets up routing, context, and layout */
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AppProvider } from "./context/AppContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Notification from "./components/Notification";
import Home from "./pages/Home";
import Cars from "./pages/Cars";
import Booking from "./pages/Booking";
import Login from "./pages/Login";
import About from "./pages/About";
import Contact from "./pages/Contact";
import MyBookings from "./pages/MyBookings";
import "./index.css";

function App() {
  return (
    <AppProvider>
      <Router>
        <div className="app">
          <Navbar />
          <Notification />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cars" element={<Cars />} />
            <Route path="/booking" element={<Booking />} />
            <Route path="/login" element={<Login />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/my-bookings" element={<MyBookings />} />
          </Routes>
          <Footer />
        </div>
      </Router>
    </AppProvider>
  );
}

export default App;
