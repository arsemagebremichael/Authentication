
import React from "react";
import "../Home/style.css";
import Button from "../../sharedComponents/Button";
import { useNavigate } from "react-router-dom";

function Welcome() {
  const navigate = useNavigate();
  return (
    <div className="welcome-wrapper">
      <div className="content-panel">
        <div className="logo-container">
          <img src="/assets/logo.png" alt="Tuijenge Logo" className="logo-stacked" />
        </div>
        <h1 className="main-title">WELCOME TO</h1>
        <img src="/assets/logohorizontal.png" alt="Tuijenge Logo" className="logo-horizontal" />
        <div className="button-group">
          <Button
            label="Supplier"
            variant="primary"
            onClick={() => navigate("/signin?role=supplier")}
          />
          <Button
            
            label="Trainer"
            variant="primary"
            onClick={() => navigate("/signin?role=trainer")}
          />
        </div>
      </div>
      <div className="image-panel">
        <img src="/assets/spinach.png" alt="Spinach" className="feature-image" />
      </div>
    </div>
  );
}

export default Welcome;