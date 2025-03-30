import React, { createContext, useState, useContext, useEffect } from 'react';

// User Authentication Context, Stores JWT and User Information


// Create authentication context
const AuthContext = createContext();

// Custom Hook to Access Authentication Context
export const useAuth = () => {
  return useContext(AuthContext);
};

//  AuthProvider Component for Providing Authentication State
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Get token and user info from localStorage
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // Fetch User Information via Token (The Backend Can Verify the Token to Retrieve User Data)
      setUser({ token }); // Simulate Fetching User Data
    }
  }, []);

  // Login
  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('token', userData.token); // Save token to localStorage
  };

  // Logout
  const logout = () => {
    setUser(null);
    localStorage.removeItem('token'); // remove token
  };

  // Provide authentication state and methods
  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
