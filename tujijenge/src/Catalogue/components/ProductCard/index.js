import React from "react";
import Button from '../../../sharedComponents/Button';
import "./style.css";

function ProductCard({ product, onUpdate }) {

  const baseUrl = process.env.REACT_APP_BASE_URL || "";


  let imgSrc = product.image;
  if (imgSrc && !imgSrc.startsWith("http")) {
   
    imgSrc = baseUrl.replace(/\/$/, "") + "/" + imgSrc.replace(/^\//, "");
  }

  return (
    <div className="product-card">
      {imgSrc ? (
        <img
          src={imgSrc}
          alt={product.product_name}
          className="product-img"
          onError={e => { e.target.src = "/placeholder.jpg"; }}
        />
      ) : (
        <img
          src="/placeholder.jpg"
          alt="Placeholder"
          className="product-img"
        />
      )}
      <div className="product-title">{product.product_name}</div>
      <div className="product-price">{product.product_price} Ksh</div>
      <Button label="Update" onClick={onUpdate} variant="tertiary" />
    </div>
  );
}

export default ProductCard;