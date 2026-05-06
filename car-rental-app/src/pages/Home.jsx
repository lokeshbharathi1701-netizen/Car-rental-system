/* ============================================
   Home Page (Page 1)
   - Hero banner with call-to-action
   - Featured cars section
   - Statistics section
   - Why Choose Us section
   - Testimonials section
   ============================================ */

import { Link, useNavigate } from "react-router-dom";
import carsData from "../data/cars";
import { useAppContext } from "../context/AppContext";
import useScrollReveal from "../hooks/useScrollReveal";

const Home = () => {
  useScrollReveal();
  const navigate = useNavigate();
  const { isLoggedIn, setSelectedCar, showNotification } = useAppContext();

  // Show only 3 featured cars on home page
  const featuredCars = carsData.filter((car) => car.available).slice(0, 3);

  const handleRentClick = (car) => {
    if (!isLoggedIn) {
      showNotification("Please login to book a car.", "info");
      navigate("/login");
      return;
    }
    setSelectedCar(car);
    navigate("/booking");
  };

  return (
    <main className="home" id="home-page">
      {/* ===== Hero Section ===== */}
      <section className="hero" id="hero-section">
        <div className="hero__overlay"></div>
        <img src="/images/hero-banner.png" alt="Luxury Car" className="hero__bg" />
        <div className="hero__content">
          <span className="hero__badge">🏆 Premium Car Rentals</span>
          <h1 className="hero__title">
            Drive Your <span className="hero__highlight">Dream Car</span> Today
          </h1>
          <p className="hero__subtitle">
            Explore our fleet of luxury, sports, and economy vehicles.
            Book in minutes and hit the road in style.
          </p>
          <div className="hero__actions">
            <Link to="/cars" className="btn btn--primary btn--lg" id="hero-browse-btn">
              Browse Cars
            </Link>
            <Link to="/contact" className="btn btn--outline btn--lg" id="hero-learn-btn">
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* ===== Statistics Section ===== */}
      <section className="stats reveal" id="stats-section">
        <div className="stats__container">
          <div className="stats__item">
            <span className="stats__number">10+</span>
            <span className="stats__label">Cars Available</span>
          </div>
          <div className="stats__item">
            <span className="stats__number">500+</span>
            <span className="stats__label">Happy Customers</span>
          </div>
          <div className="stats__item">
            <span className="stats__number">25+</span>
            <span className="stats__label">Pickup Locations</span>
          </div>
          <div className="stats__item">
            <span className="stats__number">4.9★</span>
            <span className="stats__label">Average Rating</span>
          </div>
        </div>
      </section>

      {/* ===== Featured Cars Section ===== */}
      <section className="featured reveal" id="featured-section">
        <div className="section__container">
          <span className="section__badge">Our Fleet</span>
          <h2 className="section__title">Featured Vehicles</h2>
          <p className="section__subtitle">Hand-picked premium cars for an extraordinary driving experience</p>

          <div className="featured__grid">
            {featuredCars.map((car, index) => (
              <div className={`car-card reveal reveal--delay-${index + 1}`} key={car.id} id={`featured-car-${car.id}`}>
                <div className="car-card__image-wrapper">
                  <img src={car.image} alt={car.name} className="car-card__image" />
                  <span className="car-card__category">{car.category}</span>
                  <span className="car-card__rating">★ {car.rating}</span>
                </div>
                <div className="car-card__body">
                  <h3 className="car-card__name">{car.name}</h3>
                  <p className="car-card__brand">{car.brand} {car.model} • {car.year}</p>
                  <div className="car-card__specs">
                    <span>👥 {car.seats} Seats</span>
                    <span>⚙️ {car.transmission}</span>
                    <span>⛽ {car.fuelType}</span>
                  </div>
                  <div className="car-card__footer">
                    <div className="car-card__price">
                      <span className="car-card__price-value">₹{car.pricePerDay}</span>
                      <span className="car-card__price-unit">/day</span>
                    </div>
                    <button
                      onClick={() => handleRentClick(car)}
                      className="btn btn--primary btn--sm"
                      id={`rent-btn-${car.id}`}
                    >
                      Rent Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="featured__cta">
            <Link to="/cars" className="btn btn--primary btn--lg" id="view-all-cars-btn">
              View All Cars →
            </Link>
          </div>
        </div>
      </section>

      {/* ===== Why Choose Us Section ===== */}
      <section className="why-us reveal" id="why-us-section">
        <div className="section__container">
          <span className="section__badge">Why carGo</span>
          <h2 className="section__title">Why Choose Us?</h2>
          <p className="section__subtitle">We make car rental simple, affordable, and enjoyable</p>

          <div className="why-us__grid">
            <div className="why-us__card reveal reveal--delay-1" id="why-us-1">
              <div className="why-us__icon">🚀</div>
              <h3 className="why-us__card-title">Fast Booking</h3>
              <p className="why-us__card-text">Book your car in under 3 minutes with our streamlined process.</p>
            </div>
            <div className="why-us__card reveal reveal--delay-2" id="why-us-2">
              <div className="why-us__icon">💰</div>
              <h3 className="why-us__card-title">Best Prices</h3>
              <p className="why-us__card-text">Competitive pricing with no hidden fees. What you see is what you pay.</p>
            </div>
            <div className="why-us__card reveal reveal--delay-3" id="why-us-3">
              <div className="why-us__icon">🛡️</div>
              <h3 className="why-us__card-title">Full Insurance</h3>
              <p className="why-us__card-text">All our vehicles come with comprehensive insurance coverage.</p>
            </div>
            <div className="why-us__card reveal reveal--delay-4" id="why-us-4">
              <div className="why-us__icon">📞</div>
              <h3 className="why-us__card-title">24/7 Support</h3>
              <p className="why-us__card-text">Our team is always available to help you, anytime, anywhere.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Testimonials Section ===== */}
      <section className="testimonials reveal" id="testimonials-section">
        <div className="section__container">
          <span className="section__badge">Reviews</span>
          <h2 className="section__title">What Our Customers Say</h2>
          <div className="testimonials__grid">
            <div className="testimonial-card" id="testimonial-1">
              <div className="testimonial-card__stars">★★★★★</div>
              <p className="testimonial-card__text">
                "Incredible service! The car was in perfect condition and the booking process was seamless. Highly recommend carGo!"
              </p>
              <div className="testimonial-card__author">
                <div className="testimonial-card__avatar">AS</div>
                <div>
                  <strong>Arun Sharma</strong>
                  <p>Business Traveler</p>
                </div>
              </div>
            </div>
            <div className="testimonial-card" id="testimonial-2">
              <div className="testimonial-card__stars">★★★★★</div>
              <p className="testimonial-card__text">
                "Best rental experience ever! Great selection of cars and amazing customer support. Will definitely use again."
              </p>
              <div className="testimonial-card__author">
                <div className="testimonial-card__avatar">PR</div>
                <div>
                  <strong>Priya Reddy</strong>
                  <p>Weekend Explorer</p>
                </div>
              </div>
            </div>
            <div className="testimonial-card" id="testimonial-3">
              <div className="testimonial-card__stars">★★★★★</div>
              <p className="testimonial-card__text">
                "The luxury SUV was perfect for our family trip. Clean, comfortable, and the pricing was very fair."
              </p>
              <div className="testimonial-card__author">
                <div className="testimonial-card__avatar">RK</div>
                <div>
                  <strong>Rajesh Kumar</strong>
                  <p>Family Vacation</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== CTA Banner ===== */}
      <section className="cta-banner reveal reveal--zoom" id="cta-section">
        <div className="cta-banner__content">
          <h2 className="cta-banner__title">Ready to Hit the Road?</h2>
          <p className="cta-banner__text">Join thousands of happy customers. Book your dream car today!</p>
          <Link to="/cars" className="btn btn--white btn--lg" id="cta-btn">
            Get Started →
          </Link>
        </div>
      </section>
    </main>
  );
};

export default Home;
