import api from './axios'; 

// Authentication-related APIs (Login, Registration)

export const login = async (email, password) => {
  try {
    const response = await api.post('/auth/login', { email, password });
    localStorage.setItem('token', response.data.token); // Save token
    return response.data;
  } catch (error) {
    throw new Error('Login failed: ' + error.message);
  }
};

// Register
export const register = async (username, email, password) => {
  try {
    const response = await api.post('/auth/register', { username, email, password });
    return response.data;
  } catch (error) {
    throw new Error('Registration failed: ' + error.message);
  }
};
