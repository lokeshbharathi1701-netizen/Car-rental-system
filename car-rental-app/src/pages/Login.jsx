/* Login/Registration Page (Page 4) - Toggle Login & Register, form validation, password strength */
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";

const Login = () => {
  const navigate = useNavigate();
  const { login, register, isLoggedIn } = useAppContext();
  const [activeTab, setActiveTab] = useState("login");
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [loginErrors, setLoginErrors] = useState({});
  const [registerData, setRegisterData] = useState({ name: "", email: "", phone: "", password: "", confirmPassword: "" });
  const [registerErrors, setRegisterErrors] = useState({});

  if (isLoggedIn) {
    return (
      <main className="login-page" id="login-page">
        <section className="page-header"><div className="page-header__content"><h1 className="page-header__title">Already Logged In</h1></div></section>
        <section className="auth-section"><div className="section__container">
          <div className="auth-logged-in" id="already-logged-in">
            <span className="auth-logged-in__icon">✅</span><h2>You are already logged in!</h2>
            <p>You can now browse cars and make bookings.</p>
            <button onClick={() => navigate("/cars")} className="btn btn--primary btn--lg" id="browse-cars-btn">Browse Cars</button>
          </div>
        </div></section>
      </main>
    );
  }

  const handleLoginChange = (e) => { setLoginData(p => ({ ...p, [e.target.name]: e.target.value })); setLoginErrors(p => ({ ...p, [e.target.name]: "" })); };
  const handleRegisterChange = (e) => { setRegisterData(p => ({ ...p, [e.target.name]: e.target.value })); setRegisterErrors(p => ({ ...p, [e.target.name]: "" })); };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    const errs = {};
    if (!loginData.email.trim()) errs.email = "Email is required.";
    else if (!/\S+@\S+\.\S+/.test(loginData.email)) errs.email = "Enter a valid email.";
    if (!loginData.password || loginData.password.length < 6) errs.password = "Password must be at least 6 characters.";
    setLoginErrors(errs);
    if (Object.keys(errs).length > 0) return;
    const success = await login({ name: loginData.email.split("@")[0], email: loginData.email, password: loginData.password });
    if (success) navigate("/cars");
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    const errs = {};
    if (!registerData.name.trim()) errs.name = "Name is required.";
    if (!registerData.email.trim()) errs.email = "Email is required.";
    else if (!/\S+@\S+\.\S+/.test(registerData.email)) errs.email = "Enter a valid email.";
    if (!registerData.phone.trim() || registerData.phone.length < 10) errs.phone = "Enter a valid phone number.";
    if (!registerData.password || registerData.password.length < 6) errs.password = "Min 6 characters.";
    if (registerData.password !== registerData.confirmPassword) errs.confirmPassword = "Passwords do not match.";
    setRegisterErrors(errs);
    if (Object.keys(errs).length > 0) return;
    const success = await register({ name: registerData.name, email: registerData.email, phone: registerData.phone, password: registerData.password });
    if (success) navigate("/cars");
  };

  const pwStrength = !registerData.password ? null : registerData.password.length < 6 ? { l: "Weak", c: "strength--weak" } : registerData.password.length < 10 ? { l: "Medium", c: "strength--medium" } : { l: "Strong", c: "strength--strong" };

  return (
    <main className="login-page" id="login-page">
      <section className="page-header" id="login-header"><div className="page-header__content">
        <span className="page-header__badge">Account</span>
        <h1 className="page-header__title">Login / Register</h1>
        <p className="page-header__subtitle">Create an account or sign in to book your favourite cars</p>
      </div></section>
      <section className="auth-section" id="auth-section"><div className="section__container">
        <div className="auth-card" id="auth-card">
          <div className="auth-tabs" id="auth-tabs">
            <button className={`auth-tab ${activeTab === "login" ? "auth-tab--active" : ""}`} onClick={() => setActiveTab("login")} id="login-tab">Login</button>
            <button className={`auth-tab ${activeTab === "register" ? "auth-tab--active" : ""}`} onClick={() => setActiveTab("register")} id="register-tab">Register</button>
          </div>

          {activeTab === "login" && (
            <form className="auth-form" onSubmit={handleLoginSubmit} id="login-form" noValidate>
              <div className="form-group">
                <label htmlFor="login-email" className="form-label">Email Address</label>
                <input type="email" id="login-email" name="email" value={loginData.email} onChange={handleLoginChange} className={`form-input ${loginErrors.email ? "form-input--error" : ""}`} placeholder="your@email.com" />
                {loginErrors.email && <span className="form-error">{loginErrors.email}</span>}
              </div>
              <div className="form-group">
                <label htmlFor="login-password" className="form-label">Password</label>
                <input type="password" id="login-password" name="password" value={loginData.password} onChange={handleLoginChange} className={`form-input ${loginErrors.password ? "form-input--error" : ""}`} placeholder="Enter your password" />
                {loginErrors.password && <span className="form-error">{loginErrors.password}</span>}
              </div>
              <button type="submit" className="btn btn--primary btn--lg btn--full" id="login-submit-btn">Sign In</button>
              <p className="auth-switch">Don't have an account? <button type="button" onClick={() => setActiveTab("register")} className="auth-switch__link">Register here</button></p>
            </form>
          )}

          {activeTab === "register" && (
            <form className="auth-form" onSubmit={handleRegisterSubmit} id="register-form" noValidate>
              <div className="form-group">
                <label htmlFor="register-name" className="form-label">Full Name</label>
                <input type="text" id="register-name" name="name" value={registerData.name} onChange={handleRegisterChange} className={`form-input ${registerErrors.name ? "form-input--error" : ""}`} placeholder="Your full name" />
                {registerErrors.name && <span className="form-error">{registerErrors.name}</span>}
              </div>
              <div className="form-grid form-grid--2">
                <div className="form-group">
                  <label htmlFor="register-email" className="form-label">Email</label>
                  <input type="email" id="register-email" name="email" value={registerData.email} onChange={handleRegisterChange} className={`form-input ${registerErrors.email ? "form-input--error" : ""}`} placeholder="your@email.com" />
                  {registerErrors.email && <span className="form-error">{registerErrors.email}</span>}
                </div>
                <div className="form-group">
                  <label htmlFor="register-phone" className="form-label">Phone</label>
                  <input type="tel" id="register-phone" name="phone" value={registerData.phone} onChange={handleRegisterChange} className={`form-input ${registerErrors.phone ? "form-input--error" : ""}`} placeholder="+1 (555) 000-0000" />
                  {registerErrors.phone && <span className="form-error">{registerErrors.phone}</span>}
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="register-password" className="form-label">Password</label>
                <input type="password" id="register-password" name="password" value={registerData.password} onChange={handleRegisterChange} className={`form-input ${registerErrors.password ? "form-input--error" : ""}`} placeholder="Min 6 characters" />
                {pwStrength && <div className={`password-strength ${pwStrength.c}`}><div className="password-strength__bar"></div><span className="password-strength__label">{pwStrength.l}</span></div>}
                {registerErrors.password && <span className="form-error">{registerErrors.password}</span>}
              </div>
              <div className="form-group">
                <label htmlFor="register-confirm-password" className="form-label">Confirm Password</label>
                <input type="password" id="register-confirm-password" name="confirmPassword" value={registerData.confirmPassword} onChange={handleRegisterChange} className={`form-input ${registerErrors.confirmPassword ? "form-input--error" : ""}`} placeholder="Re-enter password" />
                {registerErrors.confirmPassword && <span className="form-error">{registerErrors.confirmPassword}</span>}
              </div>
              <button type="submit" className="btn btn--primary btn--lg btn--full" id="register-submit-btn">Create Account</button>
              <p className="auth-switch">Already have an account? <button type="button" onClick={() => setActiveTab("login")} className="auth-switch__link">Sign in</button></p>
            </form>
          )}
        </div>
      </div></section>
    </main>
  );
};

export default Login;
