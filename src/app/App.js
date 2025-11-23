import React from "react";
import { Routes, Route } from "react-router-dom";

import LandingPage from "../pages/Landing/LandingPage";
import SignUpPage from "../pages/Auth/SignUpPage";
import LoginPage from "../pages/Auth/LoginPage";
import PetRegistration from "../pages/Pets/PetRegistration";
import Loading from "../components/Loading/Loading";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register-pet" element={<PetRegistration />} />
      <Route path="/loading" element={<Loading />} />
    </Routes>
  );
}
