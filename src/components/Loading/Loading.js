import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import logo from "../../assets/Logo.png";
import "./Loading.css";


export default function Loading() {
  const navigate = useNavigate();
  const location = useLocation();
  const next = (location.state && location.state.to) || "/";

  useEffect(() => {
    const t = setTimeout(() => navigate(next, { replace: true }), 5000);
    return () => clearTimeout(t);
  }, [navigate, next]);

  return (
    <div className="load-wrap">
      <div className="loader">
        <div className="ring"></div>
        <div className="mask">
          <svg className="waves" viewBox="0 0 200 200" preserveAspectRatio="none">
            <defs>
              <clipPath id="clipCircle">
                <circle cx="100" cy="100" r="100" />
              </clipPath>
            </defs>
            <g clipPath="url(#clipCircle)">
              <g className="wave1">
                <path d="M0,150 Q50,130 100,150 T200,150 L200,200 L0,200 Z" fill="#FF9A3E" />
              </g>
              <g className="wave2">
                <path d="M0,160 Q50,140 100,160 T200,160 L200,200 L0,200 Z" fill="#FFC02D" />
              </g>
            </g>
          </svg>
        </div>
        <img className="logo-fade" src={logo} alt="" />
      </div>
      <p className="loading-text">Loading, Please wait . . .</p>
    </div>
  );
}
