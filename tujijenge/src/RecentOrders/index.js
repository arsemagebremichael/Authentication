import React, { useState } from 'react';
import OrderRow from './components/OrderRow';
import SearchBar from '../sharedComponents/SearchBar';
import './index.css';
import '../sharedComponents/Orders/index.css';
import { useFetchOrders } from '../hooks/useFetchGroupOrders'; 

const RecentOrders = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const itemsPerPage = 10;
  const { orders, loading, error, updateOrder, totalOrders } = useFetchOrders(searchTerm, page, itemsPerPage, null, true);

  const handleMarkDelivered = async (orderId) => {
    try {
      await updateOrder(orderId, 'delivered');
      console.log('Order marked as delivered:', orderId);
    } catch (error) {
      console.error('Failed to mark as delivered:', error);
    }
  };

  if (loading) return <div className="recent-orders-wrapper">Loading orders...</div>;
  if (error) return <div className="recent-orders-wrapper">Error: {error}</div>;

  return (
    <div className="recent-orders-wrapper">
      <div className="order-history">
        <div className="search-section">
          <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          <span className="order-count">
            {Math.min((page - 1) * itemsPerPage + 1, totalOrders)}-
            {Math.min(page * itemsPerPage, totalOrders)} of {totalOrders} orders
          </span>
        </div>
        <h1 className="page-title">Recent Orders</h1>
        <div className="order-table" data-view="table">
          <div className="table-header">
            <div>Community</div>
            <div>Order Date</div>
            <div>Total Price</div>
            <div>Items</div>
            <div>Customers</div>
            <div>Status</div>
          </div>
          {orders.length ? (
            orders.map((order, index) => (
              <OrderRow
                key={order.id}
                className={index % 2 === 0 ? 'even-row' : 'odd-row'}
                order={order}
                onMarkDelivered={handleMarkDelivered}
              />
            ))
          ) : (
            <div className="no-orders">No orders found</div>
          )}
        </div>
        <div className="pagination-controls">
          <button
            className="pagination-btn"
            onClick={() => setPage(prev => Math.max(prev - 1, 1))}
            disabled={page === 1}
          >
            Previous
          </button>
          <span className="page-number">Page {page}</span>
          <button
            className="pagination-btn"
            onClick={() => setPage(prev => (page * itemsPerPage < totalOrders ? prev + 1 : prev))}
            disabled={page * itemsPerPage >= totalOrders}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecentOrders;