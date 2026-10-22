// src/services/api.js
// Production REST API client connecting to Express.js server (http://localhost:5000)

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const getAuthToken = () => localStorage.getItem('authToken');

export const fetchWithAuth = async (endpoint, options = {}) => {
  const token = getAuthToken();
  const url = `${BASE_URL}${endpoint}`;

  const headers = {
    'Content-Type': 'application/json',
    ...(token && token !== 'expired' && { Authorization: `Bearer ${token}` }),
    ...options.headers,
  };

  // Simulated expired token test support
  if (token === 'expired') {
    headers['Authorization'] = 'Bearer expired';
  }

  const response = await fetch(url, {
    ...options,
    headers,
  });

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    const errorMsg = data?.error || data?.message || `Request failed with status ${response.status}`;
    const err = new Error(errorMsg);
    err.status = response.status;
    throw err;
  }

  return data;
};

export default fetchWithAuth;
