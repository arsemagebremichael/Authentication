
const baseUrl = process.env.REACT_APP_BASE_URL;

export function setToken(token) {
  localStorage.setItem("token", token);
}

export function getToken() {
  return localStorage.getItem("token");
}

export function removeToken() {
  localStorage.removeItem("token");
}

export const fetchProducts = async () => {
  try {
    const token = getToken();
    const response = await fetch(`${baseUrl}products`, {
      headers: {
        'Authorization': `Token ${token}`,
      },
    });
    if (!response.ok) throw new Error(`Something went wrong: ${response.status}`);
    const result = await response.json();
    return result;
  } catch (error) {
    throw new Error(error.message ?? "An error occurred");
  }
};