/* ============================================
   Car Listing Page (Page 2)
   - Displays all available cars with details
   - Filter by category and sort by price
   - Search functionality
   - Click to select car for booking
   ============================================ */

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import carsData from "../data/cars";
import { useAppContext } from "../context/AppContext";
import useScrollReveal from "../hooks/useScrollReveal";

const Cars = () => {
  useScrollReveal();
  const navigate = useNavigate();
  const { setSelectedCar, isLoggedIn, showNotification } = useAppContext();

  // State for filtering and searching
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [sortBy, setSortBy] = useState("default");

  // Get unique categories from car data
  const categories = ["All", ...new Set(carsData.map((car) => car.category))];

  // Filter and sort cars
  let filteredCars = carsData.filter((car) => {
    const matchesSearch =
      car.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      car.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
      car.model.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === "All" || car.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  // Sort the filtered results
  if (sortBy === "price-low") {
    filteredCars.sort((a, b) => a.pricePerDay - b.pricePerDay);
  } else if (sortBy === "price-high") {
    filteredCars.sort((a, b) => b.pricePerDay - a.pricePerDay);
  } else if (sortBy === "rating") {
    filteredCars.sort((a, b) => b.rating - a.rating);
  }

  // Handle "Rent Now" click
  const handleRentClick = (car) => {
    if (!car.available) {
      showNotification("This car is currently unavailable.", "error");
      return;
    }

    if (!isLoggedIn) {
      showNotification("Please login to book a car.", "info");
      navigate("/login");
      return;
    }

    setSelectedCar(car);
    navigate("/booking");
  };

  return (
    <main className="cars-page" id="cars-page">
      {/* Page Header */}
      <section className="page-header" id="cars-header">
        <div className="page-header__content">
          <span className="page-header__badge">Our Fleet</span>
          <h1 className="page-header__title">Available Cars</h1>
          <p className="page-header__subtitle">
            Choose from our wide range of premium vehicles for any occasion
          </p>
        </div>
      </section>

      {/* Filters Section */}
      <section className="cars-filters" id="cars-filters">
        <div className="section__container">
          <div className="cars-filters__bar">
            {/* Search Input */}
            <div className="cars-filters__search">
              <span className="cars-filters__search-icon">🔍</span>
              <input
                type="text"
                placeholder="Search by name, brand, or model..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="cars-filters__input"
                id="car-search-input"
              />
            </div>

            {/* Category Filter */}
            <div className="cars-filters__group">
              <label className="cars-filters__label">Category:</label>
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="cars-filters__select"
                id="category-filter"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            {/* Sort By */}
            <div className="cars-filters__group">
              <label className="cars-filters__label">Sort:</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="cars-filters__select"
                id="sort-filter"
              >
                <option value="default">Default</option>
                <option value="price-low">Price: Low → High</option>
                <option value="price-high">Price: High → Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>
          </div>

          {/* Results Count */}
          <p className="cars-filters__count">
            Showing <strong>{filteredCars.length}</strong> of {carsData.length} cars
          </p>
        </div>
      </section>

      {/* Cars Grid */}
      <section className="cars-grid-section reveal" id="cars-grid-section">
        <div className="section__container">
          {filteredCars.length === 0 ? (
            <div className="cars-empty" id="cars-empty">
              <span className="cars-empty__icon">🔍</span>
              <h3>No cars found</h3>
              <p>Try adjusting your search or filter criteria.</p>
            </div>
          ) : (
            <div className="cars-grid">
              {filteredCars.map((car, index) => (
                <div
                  className={`car-card car-card--full reveal reveal--delay-${(index % 3) + 1} ${!car.available ? "car-card--unavailable" : ""}`}
                  key={car.id}
                  id={`car-card-${car.id}`}
                >
                  {/* Car Image */}
                  <div className="car-card__image-wrapper">
                    <img 
                      src={car.image} 
                      alt={car.name} 
                      className="car-card__image" 
                      onError={(e) => {
                        e.target.onerror = null; 
                        e.target.src = "https://images.unsplash.com/photo-1494905998402-395d579af36f?auto=format&fit=crop&w=800&q=80";
                      }}
                    />
                    <span className="car-card__category">{car.category}</span>
                    <span className="car-card__rating">★ {car.rating}</span>
                    {!car.available && <div className="car-card__unavailable-badge">Unavailable</div>}
                  </div>

                  {/* Car Details */}
                  <div className="car-card__body">
                    <h3 className="car-card__name">{car.name}</h3>
                    <p className="car-card__brand">{car.brand} {car.model} • {car.year}</p>

                    {/* Specifications */}
                    <div className="car-card__specs">
                      <span>👥 {car.seats} Seats</span>
                      <span>⚙️ {car.transmission}</span>
                      <span>⛽ {car.fuelType}</span>
                    </div>

                    {/* Features */}
                    <div className="car-card__features">
                      {car.features.map((feature, index) => (
                        <span key={index} className="car-card__feature-tag">
                          {feature}
                        </span>
                      ))}
                    </div>

                    {/* Price & Action */}
                    <div className="car-card__footer">
                      <div className="car-card__price">
                        <span className="car-card__price-value">₹{car.pricePerDay}</span>
                        <span className="car-card__price-unit">/day</span>
                      </div>
                      <button
                        onClick={() => handleRentClick(car)}
                        className={`btn ${car.available ? "btn--primary" : "btn--disabled"} btn--sm`}
                        disabled={!car.available}
                        id={`rent-car-btn-${car.id}`}
                      >
                        {car.available ? "Rent Now" : "Unavailable"}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
};

export default Cars;
