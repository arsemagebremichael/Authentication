import React from "react";
import "./style.css";
import Button from "../../sharedComponents/Button";
import { useNavigate } from "react-router-dom";

function Orders() {
  const navigate = useNavigate();
  return (
    <div className="welcome-wrapper">
      <div className="left-panel">
        <span className="skip-link" onClick={() => navigate("/home")}>Skip</span>
        <div className="logo-container">
          <img src="/assets/logo.png" alt="Tuijenge Logo" className="logostacked" />
        </div>

        <h1 className="welcome">Manage Bulk Orders</h1>
        <p className="subtitle">Manage orders from Mama Mbogas community in bulk, for easier management.</p>
        <div className="pagination-dots">
          <span className="dot"></span>
          <span className="dot"></span>
          <span className="dot active"></span>
          <span className="dot"></span>
        </div>
        <div className="button">
          <Button
            label="Continue"
            variant="primary"
            onClick={() => navigate("/verification")}
          />
        </div>
        
        
      </div>
      <div className="right-panel">
        <img src="/assets/spinach.png" alt="Spinach" className="right-image" />
      </div>
    </div>
  );
}

export default Orders;