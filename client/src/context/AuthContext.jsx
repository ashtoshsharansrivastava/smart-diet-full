import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 🟢 ON APP START: Check if user is already logged in
    const checkLoggedIn = () => {
      try {
        const storedUserInfo = localStorage.getItem('userInfo');
        
        if (storedUserInfo) {
          // If we find data, set the user immediately
          const parsedUser = JSON.parse(storedUserInfo);
          setUser(parsedUser);
        }
      } catch (error) {
        console.error("Error parsing user info:", error);
        localStorage.removeItem('userInfo'); // Clear corrupt data
      } finally {
        setLoading(false); // App is ready
      }
    };

    checkLoggedIn();
  }, []);

  // Login Function (Standard Email/Pass)
  const login = async (email, password) => {
    try {
      // Adjust URL if needed (use your Render URL or relative path)
      const BACKEND_URL = "https://smart-diet-full.onrender.com"; 
      
      const { data } = await axios.post(`${BACKEND_URL}/api/users/login`, {
        email,
        password,
      });

      localStorage.setItem('userInfo', JSON.stringify(data));
      setUser(data); // 👈 Update State immediately
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        message: error.response?.data?.message || 'Login failed' 
      };
    }
  };

  // Google Login Helper (Updates state manually)
  const googleLoginManual = (userData) => {
    localStorage.setItem('userInfo', JSON.stringify(userData));
    setUser(userData);
  };

  // Logout Function
  const logout = () => {
    localStorage.removeItem('userInfo');
    setUser(null);
    window.location.href = '/login'; // Hard redirect to clear everything
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, googleLoginManual, loading }}>
      {/* Wait for loading to finish before rendering app to prevent "flicker" */}
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);