/* ============================================
   Booking Page (Page 3)
   - Shows selected car (or lets user pick one)
   - Booking form: pickup/return date, location
   - Automatic price calculation
   - Booking confirmation message
   ============================================ */

import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import carsData from "../data/cars";
import { useAppContext } from "../context/AppContext";

const Booking = () => {
  const navigate = useNavigate();
  const { selectedCar, setSelectedCar, addBooking, isLoggedIn, user, showNotification } = useAppContext();

  // Protect page: Redirect to login if not authenticated
  useEffect(() => {
    if (!isLoggedIn) {
      showNotification("Please login to access the booking page.", "info");
      navigate("/login");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoggedIn]);

  // Form state
  const [formData, setFormData] = useState({
    pickupDate: "",
    returnDate: "",
    pickupLocation: "",
    fullName: "",
    email: "",
    phone: "",
  });

  // Calculation state
  const [totalDays, setTotalDays] = useState(0);
  const [totalCost, setTotalCost] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [bookingDetails, setBookingDetails] = useState(null);
  const [errors, setErrors] = useState({});

  // Pre-fill user data if logged in
  useEffect(() => {
    if (isLoggedIn && user) {
      setFormData((prev) => ({
        ...prev,
        fullName: user.name || "",
        email: user.email || "",
      }));
    }
  }, [isLoggedIn, user]);

  // Calculate total cost when dates change
  useEffect(() => {
    if (formData.pickupDate && formData.returnDate && selectedCar) {
      const pickup = new Date(formData.pickupDate);
      const returnD = new Date(formData.returnDate);
      const diffTime = returnD - pickup;
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      if (diffDays > 0) {
        setTotalDays(diffDays);
        let cost = diffDays * selectedCar.pricePerDay;
        if (formData.pickupLocation === "Hotel Delivery") {
          cost += 500;
        }
        setTotalCost(cost);
      } else {
        setTotalDays(0);
        setTotalCost(0);
      }
    }
  }, [formData.pickupDate, formData.returnDate, formData.pickupLocation, selectedCar]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error for this field
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  // Form validation
  const validateForm = () => {
    const newErrors = {};

    if (!selectedCar) newErrors.car = "Please select a car first.";
    if (!formData.fullName.trim()) newErrors.fullName = "Full name is required.";
    if (!formData.email.trim()) newErrors.email = "Email is required.";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Enter a valid email.";
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required.";
    else if (formData.phone.length < 10) newErrors.phone = "Enter a valid phone number.";
    if (!formData.pickupDate) newErrors.pickupDate = "Pickup date is required.";
    if (!formData.returnDate) newErrors.returnDate = "Return date is required.";
    if (formData.pickupDate && formData.returnDate) {
      if (new Date(formData.returnDate) <= new Date(formData.pickupDate)) {
        newErrors.returnDate = "Return date must be after pickup date.";
      }
    }
    if (!formData.pickupLocation.trim()) newErrors.pickupLocation = "Pickup location is required.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      showNotification("Please fix the errors in the form.", "error");
      return;
    }

    // Create booking
    const booking = await addBooking({
      car: selectedCar,
      ...formData,
      totalDays,
      totalCost,
    });

    if (booking) {
      setBookingDetails(booking);
      setIsSubmitted(true);
    }
  };

  // Minimum date for pickup (today)
  const today = new Date().toISOString().split("T")[0];

  // Show confirmation if booking is submitted
  if (isSubmitted && bookingDetails) {
    return (
      <main className="booking-page" id="booking-page">
        <section className="booking-confirmation" id="booking-confirmation">
          <div className="booking-confirmation__card">
            <div className="booking-confirmation__icon">🎉</div>
            <h2 className="booking-confirmation__title">Booking Confirmed!</h2>
            <p className="booking-confirmation__subtitle">Your reservation has been successfully made.</p>

            <div className="booking-confirmation__details">
              <div className="booking-confirmation__row">
                <span>Booking ID:</span>
                <strong>#{bookingDetails.id}</strong>
              </div>
              <div className="booking-confirmation__row">
                <span>Car:</span>
                <strong>{bookingDetails.car.name}</strong>
              </div>
              <div className="booking-confirmation__row">
                <span>Pickup Date:</span>
                <strong>{bookingDetails.pickupDate}</strong>
              </div>
              <div className="booking-confirmation__row">
                <span>Return Date:</span>
                <strong>{bookingDetails.returnDate}</strong>
              </div>
              <div className="booking-confirmation__row">
                <span>Duration:</span>
                <strong>{bookingDetails.totalDays} days</strong>
              </div>
              <div className="booking-confirmation__row">
                <span>Pickup Location:</span>
                <strong>{bookingDetails.pickupLocation}</strong>
              </div>

              <div className="booking-confirmation__row booking-confirmation__row--total">
                <span>Total Cost:</span>
                <strong>₹{bookingDetails.totalCost}</strong>
              </div>
            </div>

            <div className="booking-confirmation__actions">
              <Link to="/cars" className="btn btn--primary btn--lg" id="book-another-btn">
                Book Another Car
              </Link>
              <Link to="/" className="btn btn--outline btn--lg" id="go-home-btn">
                Go Home
              </Link>
            </div>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="booking-page" id="booking-page">
      {/* Page Header */}
      <section className="page-header" id="booking-header">
        <div className="page-header__content">
          <span className="page-header__badge">Book Now</span>
          <h1 className="page-header__title">Reserve Your Car</h1>
          <p className="page-header__subtitle">
            Fill in the details below and we'll have your car ready for you
          </p>
        </div>
      </section>

      <section className="booking-content" id="booking-content">
        <div className="section__container">
          <div className="booking-layout">
            {/* Left: Booking Form */}
            <form className="booking-form" onSubmit={handleSubmit} id="booking-form" noValidate>
              {/* Car selection removed as per request. Car details are shown in the summary. */}


              {/* Personal Details */}
              <div className="booking-form__section">
                <h3 className="booking-form__section-title">👤 Personal Details</h3>
                <div className="form-grid">
                  <div className="form-group">
                    <label htmlFor="fullName" className="form-label">Full Name *</label>
                    <input
                      type="text"
                      id="fullName"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      className={`form-input ${errors.fullName ? "form-input--error" : ""}`}
                      placeholder="Enter your full name"
                    />
                    {errors.fullName && <span className="form-error">{errors.fullName}</span>}
                  </div>
                  <div className="form-group">
                    <label htmlFor="email" className="form-label">Email Address *</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`form-input ${errors.email ? "form-input--error" : ""}`}
                      placeholder="your@email.com"
                    />
                    {errors.email && <span className="form-error">{errors.email}</span>}
                  </div>
                  <div className="form-group">
                    <label htmlFor="phone" className="form-label">Phone Number *</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className={`form-input ${errors.phone ? "form-input--error" : ""}`}
                      placeholder="+1 (555) 000-0000"
                    />
                    {errors.phone && <span className="form-error">{errors.phone}</span>}
                  </div>
                </div>
              </div>

              {/* Rental Details */}
              <div className="booking-form__section">
                <h3 className="booking-form__section-title">📅 Rental Details</h3>
                <div className="form-grid">
                  <div className="form-group">
                    <label htmlFor="pickupDate" className="form-label">Pickup Date *</label>
                    <input
                      type="date"
                      id="pickupDate"
                      name="pickupDate"
                      value={formData.pickupDate}
                      onChange={handleChange}
                      min={today}
                      className={`form-input ${errors.pickupDate ? "form-input--error" : ""}`}
                    />
                    {errors.pickupDate && <span className="form-error">{errors.pickupDate}</span>}
                  </div>
                  <div className="form-group">
                    <label htmlFor="returnDate" className="form-label">Return Date *</label>
                    <input
                      type="date"
                      id="returnDate"
                      name="returnDate"
                      value={formData.returnDate}
                      onChange={handleChange}
                      min={formData.pickupDate || today}
                      className={`form-input ${errors.returnDate ? "form-input--error" : ""}`}
                    />
                    {errors.returnDate && <span className="form-error">{errors.returnDate}</span>}
                  </div>
                  <div className="form-group">
                    <label htmlFor="pickupLocation" className="form-label">Pickup Location *</label>
                    <select
                      id="pickupLocation"
                      name="pickupLocation"
                      value={formData.pickupLocation}
                      onChange={handleChange}
                      className={`form-input ${errors.pickupLocation ? "form-input--error" : ""}`}
                    >
                      <option value="">Select location</option>
                      <option value="Gandhipuram (Head Office)">Gandhipuram (Head Office)</option>
                      <option value="Coimbatore International Airport">Coimbatore International Airport</option>
                      <option value="Brookefields Mall">Brookefields Mall</option>
                      <option value="Coimbatore Junction Railway Station">Coimbatore Junction Railway Station</option>
                      <option value="Hotel Delivery (Coimbatore City)">Hotel Delivery (Coimbatore City) (+₹500)</option>
                    </select>
                    {errors.pickupLocation && <span className="form-error">{errors.pickupLocation}</span>}
                  </div>

                </div>
              </div>

              {/* Submit */}
              <button type="submit" className="btn btn--primary btn--lg btn--full" id="confirm-booking-btn">
                Confirm Booking
              </button>
            </form>

            {/* Right: Cost Summary */}
            <aside className="booking-summary" id="booking-summary">
              <div className="booking-summary__card">
                <h3 className="booking-summary__title">💵 Cost Summary</h3>

                {selectedCar ? (
                  <>
                    <div className="booking-summary__car">
                      <img src={selectedCar.image} alt={selectedCar.name} />
                      <div>
                        <h4>{selectedCar.name}</h4>
                        <p>{selectedCar.brand} {selectedCar.model}</p>
                      </div>
                    </div>

                    <div className="booking-summary__breakdown">
                      <div className="booking-summary__row">
                        <span>Price per day</span>
                        <span>₹{selectedCar.pricePerDay}</span>
                      </div>
                      <div className="booking-summary__row">
                        <span>Duration</span>
                        <span>{totalDays > 0 ? `${totalDays} days` : "—"}</span>
                      </div>
                      <div className="booking-summary__row">
                        <span>Subtotal</span>
                        <span>{totalCost > 0 ? `₹${totalCost}` : "—"}</span>
                      </div>
                      <div className="booking-summary__row">
                        <span>Insurance</span>
                        <span>Included ✅</span>
                      </div>
                      <div className="booking-summary__row">
                        <span>Service Fee</span>
                        <span>Free</span>
                      </div>
                      <hr className="booking-summary__divider" />
                      <div className="booking-summary__row booking-summary__row--total">
                        <span>Total</span>
                        <span>₹{totalCost > 0 ? totalCost : "0"}</span>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="booking-summary__empty">
                    <span>🚗</span>
                    <p>Select a car to see pricing</p>
                  </div>
                )}
              </div>
            </aside>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Booking;
