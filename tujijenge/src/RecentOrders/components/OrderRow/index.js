import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import './index.css';

function OrderRow({ order, className, onMarkDelivered }) {
  const [expanded, setExpanded] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  const toggleExpand = () => {
    setExpanded((prev) => !prev);
    console.log('Toggled expanded:', !expanded);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setExpanded(false);
        console.log('Closed dropdown due to outside click');
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const totalItems = order.products?.reduce((total, product) => {
    const match = product.match(/x(\d+)/) || [null, 1];
    return total + parseInt(match[1] || 1);
  }, 0) || 0;

  console.log('OrderRow products:', order.products);
  console.log('OrderRow expanded:', expanded);
  console.log('OrderRow communityId:', order.communityId);

  return (
    <div className={`order-row-container ${className}`} ref={dropdownRef}>
      <div className="order-row" onClick={toggleExpand}>
        <div className="cell" data-label="Community:">{order.community}</div>
        <div className="cell" data-label="Order Date:">{order.date}</div>
        <div className="cell" data-label="Total Price:">{order.total}</div>
        <div className="cell items-cell" data-label="Items:" data-testid="items-cell">
          <div className="items-summary">
            <span className="item-count">{totalItems} items</span>
            <span className="expand-icon">
              {expanded ? <FaChevronUp /> : <FaChevronDown />}
            </span>
          </div>
        </div>
        <div className="cell" data-label="Customers:">
          <button
            className="view-btn"
            onClick={() => navigate(`/group-orders/${order.communityId || 'unknown'}`)}
          >
            View Customers
          </button>
        </div>
        <div className="cell status-col" data-label="Status:">
          {order.status === 'pending' ? (
            <button className="mark-btn" onClick={() => onMarkDelivered(order.id)}>
              Mark Delivered
            </button>
          ) : (
            <span className="delivery-status delivered">Delivered</span>
          )}
        </div>
      </div>
      {expanded && (
        <div className="product-details-row" data-testid="order-details-dropdown">
          <div className="products-details">
            <p><strong>Products:</strong></p>
            <ul className="order-list">
              {order.products?.length ? (
                order.products.map((product, idx) => {
                  const [item, qty] = product.split(' x');
                  const quantity = parseInt(qty) || 1;
                  return Array.from({ length: quantity }, (_, i) => (
                    <li key={`${idx}-${i}`} className="order-item">
                      {item} {quantity > 1 ? `(x${quantity})` : ''}
                    </li>
                  ));
                })
              ) : (
                <li className="order-item no-orders">No items ordered</li>
              )}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export default OrderRow;