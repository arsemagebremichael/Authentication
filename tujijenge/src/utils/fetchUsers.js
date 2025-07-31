import { fetchWithAuth, BASE_URL, TOKEN_STORAGE_KEY } from './fetchApi';

export const fetchUsers = async (token = localStorage.getItem(TOKEN_STORAGE_KEY)) => {
  try {
    const data = await fetchWithAuth(`${BASE_URL}/users/`, token);
    return data.map(u => ({
      id: u.id,
      first_name: u.first_name,
      last_name: u.last_name,
      address: u.address || 'No location'
    }));
  } catch (error) {
    console.error('Fetch users error:', error);
    throw error;
  }
};