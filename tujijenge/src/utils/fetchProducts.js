import { fetchWithAuth, BASE_URL, TOKEN_STORAGE_KEY } from './fetchApi';

export const fetchProducts = async (token = localStorage.getItem(TOKEN_STORAGE_KEY)) => {
  try {
    const data = await fetchWithAuth(`${BASE_URL}/products/`, token);
    return data.map(p => ({
      id: p.product_id,
      name: p.product_name
    }));
  } catch (error) {
    console.error('Fetch products error:', error);
    throw error;
  }
};