import React from "react";
import './style.css';
import { useNavigate } from "react-router-dom";
import Button from '../../sharedComponents/Button/index.js'

function SupplyChain() {
  const navigate = useNavigate();
  return (
    <div className="welcome-wrapper">
      <div className="left-panel">
        <span className="skip-link" onClick={() => navigate("/home")}>Skip</span>
        <div className="logo-container">
          <img src="/assets/logo.png" alt="Tuijenge Logo" className="logostacked" />
        </div>
        <h1 className="welcome">Welcome to Tujijenge</h1>
        <p className="subtitle">A platform that connects Mama Mbogas with their supply chain.</p>
        <div className="pagination-dots">

          <span className="dot active"></span>
          <span className="dot"></span>
          <span className="dot"></span>
          <span className="dot"></span>
        </div>
        <div className="button">
          <Button
            label="Continue"
            variant="primary"
            onClick={() => navigate("/training")}
          />
        </div>
           
      </div>
      <div className="right-panel">
        <img src="/assets/spinach.png" alt="Spinach" className="right-image" />
      </div>
    </div>
  );
}

export default SupplyChain;