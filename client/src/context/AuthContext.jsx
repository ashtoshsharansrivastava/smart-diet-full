import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../config/firebase"; // Import from your new config file

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // 1. Check if user is logged in on load
  useEffect(() => {
    const checkLoggedIn = async () => {
      const token = localStorage.getItem('smartDietToken');
      if (token) {
        axios.defaults.headers.common['x-auth-token'] = token;
        const storedUser = localStorage.getItem('smartDietUser');
        if (storedUser) setUser(JSON.parse(storedUser));
      }
      setLoading(false);
    };
    checkLoggedIn();
  }, []);

  // 2. REGISTER
  const register = async (name, email, password) => {
    try {
      const res = await axios.post('/api/auth/register', { name, email, password });
      saveUserSession(res.data.token, res.data.user);
      return { success: true };
    } catch (error) {
      return { success: false, message: error.response?.data?.message || "Registration failed" };
    }
  };

  // 3. LOGIN (Email/Pass)
  const login = async (email, password) => {
    try {
      const res = await axios.post('/api/auth/login', { email, password });
      saveUserSession(res.data.token, res.data.user);
      return { success: true };
    } catch (error) {
      return { success: false, message: error.response?.data?.message || "Invalid credentials" };
    }
  };

  // 4. GOOGLE LOGIN (The new part)
  const googleLogin = async () => {
    try {
      // A. Open Google Popup
      const result = await signInWithPopup(auth, googleProvider);
      const googleUser = result.user;

      // B. Send Google Data to YOUR Backend
      const res = await axios.post('/api/auth/google', {
        name: googleUser.displayName,
        email: googleUser.email,
        avatar: googleUser.photoURL,
        googleId: googleUser.uid
      });

      // C. Save Session
      saveUserSession(res.data.token, res.data.user);
      return { success: true };

    } catch (error) {
      console.error("Google Login Error:", error);
      return { success: false, message: error.message };
    }
  };

  // Helper to save session
  const saveUserSession = (token, userData) => {
    localStorage.setItem('smartDietToken', token);
    localStorage.setItem('smartDietUser', JSON.stringify(userData));
    axios.defaults.headers.common['x-auth-token'] = token;
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem('smartDietToken');
    localStorage.removeItem('smartDietUser');
    delete axios.defaults.headers.common['x-auth-token'];
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, register, login, googleLogin, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);