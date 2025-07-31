import React, { useState, useEffect } from "react";
import "./style.css";
import { useNavigate } from "react-router-dom";


function Splash() {

  const navigate = useNavigate();
  const [fadeIn, setFadeIn] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);
  useEffect(() => {

    setFadeIn(true);
    const fadeOutTimer = setTimeout(() => {
      setFadeOut(true);
    }, 4000);

    const navigateTimer = setTimeout(() => {
      navigate("/supplychain");
    }, 5000);

    return () => {
      clearTimeout(fadeOutTimer);
      clearTimeout(navigateTimer);
    };
  }, [navigate]);
  return (
    <div className={`splash-wrapper ${fadeIn ? 'fade-in' : ''} ${fadeOut ? 'fade-out' : ''}`}>
      <img src="/assets/logo.png" alt="Tuijenge Logo" className="splash-logo" />
    </div>
  );
}

export default Splash;
