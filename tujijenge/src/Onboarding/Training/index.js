import React from "react";
import "./style.css";
import Button from "../../sharedComponents/Button";
import { useNavigate } from "react-router-dom";

function Training() {
  const navigate = useNavigate();

  return (
    <div className="welcome-wrapper">
      <div className="left-panel">
        <span className="skip-link" onClick={() => navigate("/home")}>
          Skip
        </span>
        <div className="logo-container">
          <img src="assets/logo.png" alt="Tuijenge Logo" className="logostacked" />
        </div>
        <h1 className="welcome">Train Mama Mbogas</h1>
        <p className="subtitle">A platform that connects Mama Mbogas with a training agency.</p>
        <div className="pagination-dots">
          <span className="dot" data-testid="pagination-dot"></span>
          <span className="dot active" data-testid="pagination-dot-active"></span>
          <span className="dot" data-testid="pagination-dot"></span>
          <span className="dot" data-testid="pagination-dot"></span>
        </div>
        <div className="button">
          <Button
            label="Continue"
            variant="primary"
            onClick={() => navigate("/orders")}
          />
        </div>
      </div>
      <div className="right-panel">
        <img src="assets/spinach.png" alt="Spinach" className="right-image" />
      </div>
    </div>
  );
}

export default Training;