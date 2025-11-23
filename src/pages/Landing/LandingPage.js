import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/Logo.png";
import "./LandingPage.css";



export default function LandingPage() {
  const navigate = useNavigate();
  return (
  <main className="landing-wrap">
    <section className="landing-card">
      <img src={logo} alt="Petopia logo" className="logo" />
      <h1 className="title">Welcome to Petopia!</h1>
      <p className="subtitle">
        Petopia helps pet owners care for their furry friends — providing tips,
        reminders, and resources that make pet parenting joyful.
      </p>
      <button className="create-btn" onClick={() => navigate("/signup")}>
        Create Account
      </button>
    </section>
  </main>
);
}
