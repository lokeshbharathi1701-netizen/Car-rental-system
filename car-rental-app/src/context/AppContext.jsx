import { createContext, useContext, useState, useCallback, useEffect } from "react";

// Create the context
const AppContext = createContext();

const API_BASE_URL = "http://localhost:5000/api";

// Custom hook to use the context
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within AppProvider");
  }
  return context;
};

// Provider component wrapping the entire app
export const AppProvider = ({ children }) => {
  // --- User Authentication State ---
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem("user")) || null);
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("user"));

  // --- Booking State ---
  const [bookings, setBookings] = useState([]);
  const [selectedCar, setSelectedCar] = useState(null);

  // --- Notification State ---
  const [notification, setNotification] = useState(null);

  // Sync auth state with localStorage
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  // Fetch bookings from MongoDB whenever user logs in or adds a booking
  const fetchUserBookings = useCallback(async () => {
    if (!user?.email) return;
    try {
      const resp = await fetch(`${API_BASE_URL}/bookings?email=${user.email}`);
      const data = await resp.json();
      setBookings(data);
    } catch (err) {
      console.error("Failed to fetch bookings:", err);
    }
  }, [user?.email]);

  useEffect(() => {
    if (isLoggedIn) {
      fetchUserBookings();
    } else {
      setBookings([]);
    }
  }, [isLoggedIn, fetchUserBookings]);

  // Show a notification message (auto-hides after 4 seconds)
  const showNotification = useCallback((message, type = "success") => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 4000);
  }, []);

  // --- Auth Functions ---
  const login = async (userData) => {
    try {
      const resp = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
      });
      const data = await resp.json();
      if (data.success) {
        setUser(data.user);
        setIsLoggedIn(true);
        showNotification(`Welcome back, ${data.user.name}!`);
        return true;
      } else {
        showNotification(data.message || "Login failed. Please try again.", "error");
        return false;
      }
    } catch (err) {
      showNotification("Cannot connect to server. Please try again later.", "error");
      return false;
    }
  };

  const register = async (userData) => {
    return await login(userData);
  };

  const logout = () => {
    setUser(null);
    setIsLoggedIn(false);
    setSelectedCar(null);
    localStorage.removeItem("user");
    showNotification("You have been logged out.", "info");
  };

  // --- Booking Functions ---
  const addBooking = async (bookingData) => {
    const bookingToSave = {
      ...bookingData,
      id: Date.now().toString(),
      status: "Confirmed",
      bookedAt: new Date().toISOString(),
    };

    try {
      const resp = await fetch(`${API_BASE_URL}/bookings`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bookingToSave)
      });
      const data = await resp.json();
      if (data.success) {
        setBookings((prev) => [data.booking, ...prev]);
        showNotification("Booking saved to Database! 🎉");
        return data.booking;
      }
    } catch (err) {
      showNotification("Database error! Check connection.", "error");
    }
  };

  const deleteBooking = async (id) => {
    try {
      const resp = await fetch(`${API_BASE_URL}/bookings/${id}`, {
        method: 'DELETE',
      });
      const data = await resp.json();
      if (data.success) {
        setBookings((prev) => prev.filter((b) => b.id !== id));
        showNotification("Booking cancelled successfully!");
        return true;
      } else {
        showNotification(data.message || "Failed to cancel booking", "error");
        return false;
      }
    } catch (err) {
      showNotification("Server error! Could not cancel booking.", "error");
      return false;
    }
  };

  // All values and functions made available via context
  const value = {
    user,
    isLoggedIn,
    bookings,
    selectedCar,
    notification,
    setSelectedCar,
    login,
    register,
    logout,
    addBooking,
    deleteBooking,
    showNotification,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

