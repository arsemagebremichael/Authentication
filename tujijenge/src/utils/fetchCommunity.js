import { fetchWithAuth, BASE_URL, TOKEN_STORAGE_KEY } from './fetchApi';

export const fetchCommunities = async (token = localStorage.getItem(TOKEN_STORAGE_KEY)) => {
  try {
    const data = await fetchWithAuth(`${BASE_URL}/community/`, token);
    return data.map(c => ({
      id: c.community_id,
      name: c.name
    }));
  } catch (error) {
    console.error('Fetch communities error:', error);
    throw error;
  }
};