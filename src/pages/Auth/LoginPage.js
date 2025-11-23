import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import logo from "../../assets/Logo.png";
import "./LoginPage.css";

export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    navigate("/loading", { state: { to: "/register-pet" } });
  };

  return (
    <div className="login-wrap">
      <div className="login-card">
        <img src={logo} alt="logo" className="login-logo" />
        <form onSubmit={onSubmit} className="login-form">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={pwd}
            onChange={(e) => setPwd(e.target.value)}
          />
          <button type="button" className="forgot-link">Forgot Password?</button>
          <button type="submit" className="signin-btn">Sign in</button>
          <div className="new-line">
            <span>New to PetCare?</span>
            <Link to="/signup" className="join-now">Join Now</Link>
          </div>
        </form>
      </div>
    </div>
  );
}