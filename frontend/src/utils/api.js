export const API_BASE = 'http://localhost:3000';

export const apiCall = async (endpoint, options = {}) => {
  const token = localStorage.getItem('token');
  const defaultHeaders = {
    'Content-Type': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` })
  };

  const response = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers
    }
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.msg || 'API request failed');
  }

  return response.json();
};
