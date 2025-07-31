import React, { useState } from 'react';
import {  FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { useNavigate, useParams } from 'react-router-dom';
import { useFetchOrders } from '../hooks/useFetchGroupOrders';
import { useReferenceData } from '../hooks/useReferenceData';
import './index.css';
import '../sharedComponents/Orders/index.css';

function GroupOrders() {
  const navigate = useNavigate();
  const { groupId } = useParams();
  const groupIdNum = parseInt(groupId, 10);

  const { orders, loading, error } = useFetchOrders('', 1, 10, groupIdNum, true);
  const { referenceData, loading: refLoading, error: refError } = useReferenceData();

  const groupTitle =
    !refLoading && !refError && referenceData.communities[groupIdNum]
      ? referenceData.communities[groupIdNum]
      : `Group ${groupId}`;

  const [expandedRows, setExpandedRows] = useState({});

  const toggleRow = (orderId) => {
    setExpandedRows(prev => ({
      ...prev,
      [orderId]: !prev[orderId]
    }));
  };

  if (loading || refLoading) return <div className="group-order-container">Loading...</div>;
  if (error || refError) return <div className="group-order-container">Error: {error || refError}</div>;

  return (
    <div className="group-order-container">
      <div className="group-order">
        <div className="nav">
          <span className="back-arrow" onClick={() => navigate(-1)}>←</span>

        </div>
        <div className="table-content">
          <div className="header">
            <h2 className="group-order-title">{groupTitle} Orders</h2>
          </div>
          {orders.length === 0 ? (
            <p className="no-orders">No orders found for this group</p>
          ) : (
            <table className="group-order-table">
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Customer</th>
                  <th>Total Price</th>
                  <th>Location</th>
                  <th>Order Date</th>
                  <th>Products</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => {
                 
                  const mamambogaId = Number(order.mamamboga);

                  const customerEntry = referenceData.customers[mamambogaId];
                  const customer = customerEntry
                    ? `${customerEntry.first_name} ${customerEntry.last_name || ''}`.trim()
                    : 'Unknown Customer';

                  const address = customerEntry
                    ? customerEntry.address || 'No location'
                    : 'No location';

                  return (
                    <React.Fragment key={order.id}>
                      <tr className={order.id % 2 === 0 ? "even-row" : "odd-row"}>
                        <td>{order.id}</td>
                        <td>{customer}</td>
                        <td>{order.total}</td>
                        <td>{address}</td>
                        <td>{order.date}</td>
                        <td
                          onClick={() => toggleRow(order.id)}
                          className="items-cell"
                          style={{ cursor: 'pointer' }}
                        >
                          <div className="items-summary">
                            <span className="item-count">
                              {order.products.length} {order.products.length === 1 ? 'item' : 'items'}
                            </span>
                            <span className="expand-icon">
                              {expandedRows[order.id] ? <FaChevronUp /> : <FaChevronDown />}
                            </span>
                          </div>
                        </td>
                      </tr>
                      {expandedRows[order.id] && (
                        <tr className="product-details-row">
                          <td colSpan="6">
                            <div className="products-details">
                              <p><strong>Products:</strong></p>
                              <ul>
                                {order.products.map((product, idx) => {
                                  const parts = product.split('x');
                                  const item = parts[0]?.trim() || 'Unknown Product';
                                  const qty = parts[1]?.trim();
                                  const quantity = parseInt(qty, 10) || 1;

                                  return Array.from({ length: quantity }, (_, i) => (
                                    <li key={`${idx}-${i}`} className="order-item">
                                      {item} {quantity > 1 ? `(x${quantity})` : ''}
                                    </li>
                                  ));
                                })}
                              </ul>
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}

export default GroupOrders;
