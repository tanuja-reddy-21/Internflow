import React, { createContext, useState, useContext, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import API from '../utils/api';
const AuthContext = createContext();
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const cachedUser = localStorage.getItem('user');
    return cachedUser ? JSON.parse(cachedUser) : null;
  });
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    checkAuth();
  }, []);
  const checkAuth = () => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        if (decoded.exp * 1000 < Date.now()) {
          logout();
        }
      } catch (error) {
        logout();
      }
    }
  };
  const login = async (email, password) => {
  try {
    const { data } = await API.post('/auth/login', { email, password });
    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify(data.user));
    setUser(data.user);
    return { success: true };
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || 'Login failed'
    };
  }
};
  const register = async (userData) => {
  try {
    const { data } = await API.post('/auth/register', userData);
    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify(data.user));
    setUser(data.user);
    return { success: true };
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || 'Registration failed'
    };
  }
};
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };
  const value = {
    user,
    loading,
    login,
    register,
    logout
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
