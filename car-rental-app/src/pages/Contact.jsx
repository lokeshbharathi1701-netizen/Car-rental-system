/* Contact/About Page (Page 5) - Company info, team, map, contact form */
import { useState } from "react";
import { useAppContext } from "../context/AppContext";

const Contact = () => {
  const { showNotification } = useAppContext();
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => { setFormData(p => ({ ...p, [e.target.name]: e.target.value })); setErrors(p => ({ ...p, [e.target.name]: "" })); };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = {};
    if (!formData.name.trim()) errs.name = "Name is required.";
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) errs.email = "Valid email required.";
    if (!formData.subject.trim()) errs.subject = "Subject is required.";
    if (!formData.message.trim()) errs.message = "Message is required.";
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;
    showNotification("Message sent successfully! We'll get back to you soon. 📧");
    setSubmitted(true);
  };

  return (
    <main className="contact-page" id="contact-page">
      <section className="page-header" id="contact-header"><div className="page-header__content">
        <span className="page-header__badge">Stay Connected</span>
        <h1 className="page-header__title">Contact Us</h1>
        <p className="page-header__subtitle">Have questions? We'd love to hear from you.</p>
      </div></section>

      {/* Contact Section */}
      <section className="contact-section" id="contact-section"><div className="section__container">
        <div className="contact-grid">
          {/* Contact Info Cards */}
          <div className="contact-info">
            <div className="contact-info-card" id="contact-phone"><div className="contact-info-card__icon">📞</div><h4>Phone</h4><p>+91 98765 43210</p><p>Mon-Sat, 8AM - 10PM</p></div>
            <div className="contact-info-card" id="contact-email-card"><div className="contact-info-card__icon">✉️</div><h4>Email</h4><p>cargo@gmail.com</p><p>We reply within 24hrs</p></div>
            <div className="contact-info-card" id="contact-address"><div className="contact-info-card__icon">📍</div><h4>Address</h4><p>2X78+QQR, Ram Nagar, Gandhipuram Central Bus Stand</p><p>Coimbatore, Tamil Nadu 641018</p></div>
            <div className="contact-info-card" id="contact-hours"><div className="contact-info-card__icon">🕐</div><h4>Hours</h4><p>Mon-Sat: 8AM - 10PM</p><p>Sun: 9AM - 6PM</p></div>
          </div>

          {/* Contact Form */}
          <div className="contact-form-wrapper">
            {submitted ? (
              <div className="contact-success" id="contact-success">
                <span>✅</span><h3>Message Sent!</h3>
                <p>Thank you for reaching out. Our team will get back to you within 24 hours.</p>
                <button onClick={() => { setSubmitted(false); setFormData({ name: "", email: "", subject: "", message: "" }); }} className="btn btn--primary btn--lg">Send Another</button>
              </div>
            ) : (
              <form className="contact-form" onSubmit={handleSubmit} id="contact-form" noValidate>
                <div className="form-grid form-grid--2">
                  <div className="form-group">
                    <label htmlFor="contact-name" className="form-label">Your Name *</label>
                    <input type="text" id="contact-name" name="name" value={formData.name} onChange={handleChange} className={`form-input ${errors.name ? "form-input--error" : ""}`} placeholder="John Doe" />
                    {errors.name && <span className="form-error">{errors.name}</span>}
                  </div>
                  <div className="form-group">
                    <label htmlFor="contact-email" className="form-label">Email *</label>
                    <input type="email" id="contact-email" name="email" value={formData.email} onChange={handleChange} className={`form-input ${errors.email ? "form-input--error" : ""}`} placeholder="your@email.com" />
                    {errors.email && <span className="form-error">{errors.email}</span>}
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="contact-subject" className="form-label">Subject *</label>
                  <input type="text" id="contact-subject" name="subject" value={formData.subject} onChange={handleChange} className={`form-input ${errors.subject ? "form-input--error" : ""}`} placeholder="How can we help?" />
                  {errors.subject && <span className="form-error">{errors.subject}</span>}
                </div>
                <div className="form-group">
                  <label htmlFor="contact-message" className="form-label">Message *</label>
                  <textarea id="contact-message" name="message" value={formData.message} onChange={handleChange} className={`form-input form-textarea ${errors.message ? "form-input--error" : ""}`} placeholder="Your message here..." rows="5"></textarea>
                  {errors.message && <span className="form-error">{errors.message}</span>}
                </div>
                <button type="submit" className="btn btn--primary btn--lg btn--full" id="contact-submit-btn">Send Message</button>
              </form>
            )}
          </div>
        </div>
      </div></section>
    </main>
  );
};

export default Contact;
