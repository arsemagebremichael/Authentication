import { useState, useEffect } from 'react';
import { fetchOrders } from '../utils/fetchOrders';
import { useReferenceData } from './useReferenceData';

const TOKEN_STORAGE_KEY = 'authTokenKey';

export const useFetchOrders = (
  searchQuery = '',
  page = 1,
  limit = 10,
  groupId = null,
  groupByDateAndCommunity = true
) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [totalOrders, setTotalOrders] = useState(0);
  
  const { referenceData, loading: refLoading, error: refError } = useReferenceData();

  useEffect(() => {
    const fetchOrderData = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem(TOKEN_STORAGE_KEY);
        if (!token) throw new Error('No authentication token found. Please log in.');
        
        const response = await fetchOrders(token, {
          groupId,
          searchQuery,
          page,
          limit,
          groupByDateAndCommunity,
          communities: referenceData.communities,
          customers: referenceData.customers,
          products: referenceData.products, 
        });
        
        setOrders(response.paginatedOrders || []);
        setTotalOrders(response.total || 0);
      } catch (error) {
        console.error('Fetch error:', error);
        setError(error.message || 'Failed to fetch orders');
        setOrders([]);
        if (error.message.includes('Unauthorized')) {
          localStorage.removeItem(TOKEN_STORAGE_KEY);
          setError('Invalid or expired token. Please set a valid token.');
        }
      } finally {
        setLoading(false);
      }
    };

    if (!refLoading && !refError) {
      fetchOrderData();
    }
  }, [
    searchQuery,
    page,
    limit,
    groupId,
    groupByDateAndCommunity,
    refLoading,
    refError,
    referenceData.communities,
    referenceData.customers,
    referenceData.products,
  ]);

  const updateOrder = (orderId, status) => {
    try {
      setOrders(prevOrders =>
        prevOrders.map(order =>
          order.id === orderId ? { ...order, status } : order
        )
      );
      return { ...orders.find(order => order.id === orderId), status };
    } catch (error) {
      console.error('Update error:', error);
      throw error;
    }
  };

  return {
    loading: loading || refLoading,
    error: error || refError,
    orders,
    totalOrders,
    updateOrder,
  };
};