import React from "react";
import "./style.css";

function ProductToggle({ selected, onSelect }) {
  
  return (
    <div className="product-toggle">
      <button
        className={`toggle-btn ${selected === "VEG" ? "active" : ""}`}
        onClick={() => onSelect("VEG")}
        disabled={selected === "VEG"}
      >
        Vegetables
      </button>
      <button
        className={`toggle-btn ${selected === "FRUIT" ? "active" : ""}`}
        onClick={() => onSelect("FRUIT")}
        disabled={selected === "FRUIT"}
      >
        Fruits
      </button>
    </div>
  );
}

export default ProductToggle;