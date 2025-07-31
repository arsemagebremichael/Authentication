import React, { useState } from "react";
import { MdClose } from "react-icons/md";
import Button from '../../../sharedComponents/Button';
import "./style.css";

function AddUpdateModal({ mode, product, category, onSave, onRemove, onClose }) {
  const [productName, setProductName] = useState(product ? product.product_name : "");
  const [unit, setUnit] = useState(product ? product.unit : "");
  const [price, setPrice] = useState(product ? product.product_price : "");
  const [description, setDescription] = useState(product ? product.description : "");
  const [imageUrl, setImageUrl] = useState(product && product.image ? product.image : "");
  const [removeConfirm, setRemoveConfirm] = useState(false);

  const handleSubmit = e => {
    e.preventDefault();
    const parsedPrice = price === "" ? 0 : Number(price);
    onSave(
      {
        ...(product ? { product_id: product.product_id } : {}),
        product_name: productName,
        unit,
        product_price: parsedPrice,
        description,
        category: mode === "add" ? category : (product ? product.category : category),
        image: imageUrl,
      }
    );
  };

  const isFruit = (mode === "add" && category === "FRUIT") || (mode === "update" && product && product.category === "FRUIT");
  const modalTitle = mode === "add"
    ? `Add ${isFruit ? "Fruit" : "Vegetable"}`
    : `Update ${isFruit ? "Fruit" : "Vegetable"}`;

  return (
    <div className="modal-overlay">
      <div className="modal-card">
        <button className="modal-close" onClick={onClose}><MdClose /></button>
        <h1>{modalTitle}</h1>
        <form onSubmit={handleSubmit} className="modal-form">
          <label className="product_name">
            Product Name:
            <input
              type="text"
              value={productName}
              onChange={e => setProductName(e.target.value)}
              required
            />
          </label>
          <label className="product_unit">
            Unit:
            <input
              type="text"
              value={unit}
              onChange={e => setUnit(e.target.value)}
              required
            />
          </label>
          <label className="product_price">
            Product Price:
            <input
              type="number"
              min="0"
              step="0.01"
              value={price}
              onChange={e => setPrice(e.target.value)}
              required
            />
          </label>
          <label className="product_description">
            Description:
            <input
              type="text"
              value={description}
              onChange={e => setDescription(e.target.value)}
            />
          </label>
          <div className="modal-image-url-row">
             <label className="modal-image-url-label">
                Add image URL:
               <input
                type="url"
                value={imageUrl}
                onChange={e => setImageUrl(e.target.value)}
                placeholder="https://example.com/image.jpg"
                className="modal-image-url-input"
                />
            </label>
            {imageUrl && (
                <img src={imageUrl} alt="preview" className="modal-product-img" />
              )}
            </div>
            
            <div className="modal-btns">
              {mode === "update" && !removeConfirm && (
                  <Button
                    label="Remove"
                    onClick={e => {
                    e.preventDefault();
                    setRemoveConfirm(true);
                  }}
                  variant="secondary-additional"
                />
              )}
              {!removeConfirm && (
                <Button
                  label={mode === "add" ? "Add" : "Update"}
                  type="submit"
                  variant="additional"
                />
              )}
            </div>
        </form>
        {removeConfirm && (
          <div className="remove-confirm">
            <p>Are you sure you want to remove this product?</p>
            <Button
              label="Yes, remove"
              onClick={() => onRemove(product.product_id)}
              variant="tertiary"
            />
            <Button
              label="Cancel"
              onClick={() => setRemoveConfirm(false)}
              variant="quaternary"
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default AddUpdateModal;