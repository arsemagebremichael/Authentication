import React from "react";
import './style.css';
import { useNavigate } from "react-router-dom";
import Button from "../../sharedComponents/Button";

function Verification() {
  const navigate = useNavigate();

  return (
    <div className="welcome-wrapper">
      <div className="left-panel">
        <span className="skip-link" onClick={() => navigate("/home")}>Skip</span>
        <div className="logo-container">
          <img src="assets/logo.png" alt="Tuijenge Logo" className="logostacked" />
        </div>
        <h1 className="welcome">Verify Mama Mbogas</h1>
        <p className="subtitle">Provide verification for Mama Mbogas who have been trained.</p>
        <div className="pagination-dots">
          <span className="dot" data-testid="pagination-dot"></span>
          <span className="dot" data-testid="pagination-dot"></span>
          <span className="dot" data-testid="pagination-dot"></span>
          <span className="dot active" data-testid="pagination-dot-active"></span>
        </div>
        <div className="button">
          <Button
            label="Finish"
            variant="primary"
            onClick={() => navigate('/home')}
          />
        </div>
      </div>
      <div className="right-panel">
        <img src="assets/spinach.png" alt="Spinach" className="right-image" />
      </div>
    </div>
  );
}

export default Verification;