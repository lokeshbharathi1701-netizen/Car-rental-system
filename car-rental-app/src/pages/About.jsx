/* About Page - Company story, mission, vision, and stats */
import { useAppContext } from "../context/AppContext";

const About = () => {
  return (
    <main className="about-page" id="about-page">
      <section className="page-header" id="about-header">
        <div className="page-header__content">
          <span className="page-header__badge">Our Story</span>
          <h1 className="page-header__title">About carGo</h1>
          <p className="page-header__subtitle">Premium Car Rental Service Since 2020</p>
        </div>
      </section>

      {/* About Section */}
      <section className="about-section" id="about-content-section">
        <div className="section__container">
          <div className="about-grid">
            <div className="about-content">
              <span className="section__badge">Who We Are</span>
              <h2 className="section__title">Redefining the Driving Experience</h2>
              <p>
                Founded in 2020, carGo has grown from a small local car rental agency to one of the most trusted premium
                car rental services. Our mission is to provide an exceptional driving experience with top-quality
                vehicles and outstanding customer service.
              </p>
              <p>
                We believe that everyone deserves to drive their dream car — whether it's a luxury sedan for a
                business trip, a sporty coupe for a weekend getaway, or a spacious SUV for a family adventure.
              </p>
              <div className="about-values">
                <div className="about-value">
                  <span className="about-value__icon">🎯</span>
                  <div>
                    <h4>Our Mission</h4>
                    <p>Make premium car rental accessible and enjoyable for everyone.</p>
                  </div>
                </div>
                <div className="about-value">
                  <span className="about-value__icon">👁️</span>
                  <div>
                    <h4>Our Vision</h4>
                    <p>To become the most loved car rental brand worldwide.</p>
                  </div>
                </div>
                <div className="about-value">
                  <span className="about-value__icon">💎</span>
                  <div>
                    <h4>Our Values</h4>
                    <p>Quality, transparency, customer satisfaction, and innovation.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="about-stats-side">
              <div className="about-stat-card">
                <span className="about-stat-card__num">3+</span>
                <span>Years Experience</span>
              </div>
              <div className="about-stat-card">
                <span className="about-stat-card__num">10+</span>
                <span>Premium Cars</span>
              </div>
              <div className="about-stat-card">
                <span className="about-stat-card__num">500+</span>
                <span>Happy Customers</span>
              </div>
              <div className="about-stat-card">
                <span className="about-stat-card__num">25+</span>
                <span>Service Locations</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section (Optional enhancement for a better About page) */}
      <section className="team-section" id="team-section">
        <div className="section__container">
          <div className="section__header">
            <span className="section__badge">The Minds Behind</span>
            <h2 className="section__title">Our Expert Team</h2>
          </div>
          <div className="team-grid">
            <div className="team-card">
              <div className="team-card__img">👨‍💼</div>
              <div className="team-card__info">
                <h3>Lokesh</h3>
                <p>Founder & CEO</p>
              </div>
            </div>
            <div className="team-card">
              <div className="team-card__img">👩‍💼</div>
              <div className="team-card__info">
                <h3>Arun Kumar</h3>
                <p>Operations Manager</p>
              </div>
            </div>
            <div className="team-card">
              <div className="team-card__img">🤵</div>
              <div className="team-card__info">
                <h3>Navin</h3>
                <p>Fleet Director</p>
                <p>Customer Relations</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default About;
