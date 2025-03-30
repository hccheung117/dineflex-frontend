// src/pages/HomePage.jsx
import React, { useEffect } from 'react';
import { useAuth } from '../context/AuthContext'; // import useAuth
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const { user } = useAuth(); // Fetch user state
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login'); // Redirect to login page if not logged in
    }
  }, [user, navigate]);

  return <div>Welcome to the Home Page!</div>;
};

export default HomePage;
