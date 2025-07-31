import { useState, useEffect } from 'react';
import { fetchWithAuth, BASE_URL, TOKEN_STORAGE_KEY } from '../utils/fetchApi';
import { fetchUsers } from '../utils/fetchUsers';
import {fetchCommunities} from '../utils/fetchCommunity'
import {fetchProducts } from '../utils/fetchProducts'

export const useReferenceData = () => {
  const [referenceData, setReferenceData] = useState({ customers: {}, communities: {}, products: {} });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem(TOKEN_STORAGE_KEY);
        if (!token) throw new Error('No auth token');
        
        const [users, communities, products] = await Promise.all([
          fetchUsers(token),
          fetchCommunities(token),
          fetchProducts(token),
        ]);
        
        setReferenceData({
          customers: Object.fromEntries(
            users.map(u => [u.id, { first_name: u.first_name, last_name: u.last_name, address: u.address || 'No location' }])
          ),
          communities: Object.fromEntries(
            communities.map(c => [c.id, c.name])
          ),
          products: Object.fromEntries(
            products.map(p => [p.id, p.name])
          )
        });
      } catch (err) {
        setError(err.message || err.toString());
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);
  
  return { loading, error, referenceData };
};