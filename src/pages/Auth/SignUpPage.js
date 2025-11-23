import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import petopiaLogo from "../../assets/Petopia.png";
import showIcon from "../../assets/showw.png";
import hideIcon from "../../assets/hidee.png";
import "./SignUpPage.css";


export default function SignUpPage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    contact: "",
    address: "",
    gender: "",
    age: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  const [showPwd, setShowPwd] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [passwordTouched, setPasswordTouched] = useState(false);
  const [confirmTouched, setConfirmTouched] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const passwordErrors = () => {
    const v = formData.password || "";
    const errs = [];
    if (v.length < 8) errs.push("8+ characters");
    if (!/[a-z]/.test(v)) errs.push("Lowercase");
    if (!/[A-Z]/.test(v)) errs.push("Uppercase");
    if (!/[0-9]/.test(v)) errs.push("Number/s");
    return errs;
  };

  const confirmError = () => {
    if (!formData.confirmPassword) return "";
    if (formData.password !== formData.confirmPassword) return "Passwords do not match";
    return "";
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = passwordErrors();
    const cErr = confirmError();
    if (errs.length || cErr) {
      setPasswordTouched(true);
      setConfirmTouched(true);
      return;
    }
    navigate("/loading", { state: { to: "/register-pet" } });
  };

  return (
    <div className="signup-container">
      <div className="signup-card">
        <img src={petopiaLogo} alt="Petopia logo" className="signup-logo" />
        <h2 className="signup-tagline">
          Where Pets Connect, Explore, and Get the Care They Need!
        </h2>

        <form className="signup-form" onSubmit={handleSubmit}>
          <div className="row">
            <div className="field">
              <input type="text" name="firstName" placeholder="First Name" onChange={handleChange} />
            </div>
            <div className="field">
              <input type="text" name="lastName" placeholder="Last Name" onChange={handleChange} />
            </div>
          </div>

          <div className="row">
            <div className="field">
              <input type="email" name="email" placeholder="Email Address" onChange={handleChange} />
            </div>
            <div className="field">
              <input type="text" name="contact" placeholder="Contact Number" onChange={handleChange} />
            </div>
          </div>

          <div className="row single">
            <div className="field">
              <input type="text" name="address" placeholder="Address" onChange={handleChange} />
            </div>
          </div>

          <div className="row">
            <div className="field">
              <input type="text" name="gender" placeholder="Gender (Optional)" onChange={handleChange} />
            </div>
            <div className="field">
              <input type="number" name="age" placeholder="Age" onChange={handleChange} />
            </div>
          </div>

          <div className="row">
            <div className="field">
              <input type="text" name="username" placeholder="Username" onChange={handleChange} />
            </div>

            <div className="field">
              <div className="input-with-toggle">
                <input
                  type={showPwd ? "text" : "password"}
                  name="password"
                  placeholder="Password"
                  onChange={handleChange}
                  onBlur={() => setPasswordTouched(true)}
                  autoComplete="new-password"
                />
                <button
                  type="button"
                  className="toggle-password"
                  aria-label={showPwd ? "Hide password" : "Show password"}
                  aria-pressed={showPwd}
                  onClick={() => setShowPwd((s) => !s)}
                >
                  <img src={showPwd ? hideIcon : showIcon} alt="" />
                </button>
              </div>
              {passwordTouched && passwordErrors().length > 0 && (
                <div className="field-error">Password must include: {passwordErrors().join(" • ")}</div>
              )}
            </div>
          </div>

          <div className="row">
            <div className="field empty" />
            <div className="field">
              <div className="input-with-toggle">
                <input
                  type={showConfirm ? "text" : "password"}
                  name="confirmPassword"
                  placeholder="Repeat Password"
                  onChange={handleChange}
                  onBlur={() => setConfirmTouched(true)}
                  autoComplete="new-password"
                />
                <button
                  type="button"
                  className="toggle-password"
                  aria-label={showConfirm ? "Hide password" : "Show password"}
                  aria-pressed={showConfirm}
                  onClick={() => setShowConfirm((s) => !s)}
                >
                  <img src={showConfirm ? hideIcon : showIcon} alt="" />
                </button>
              </div>
              {confirmTouched && confirmError() && <div className="field-error">{confirmError()}</div>}
            </div>
          </div>

          <button type="submit" className="signup-btn">Sign up</button>
        </form>

        <p className="login-text">
          Already have an account?
          <button className="login-link" onClick={() => navigate("/login")}>
            Log in
          </button>
        </p>
      </div>
    </div>
  );
}
