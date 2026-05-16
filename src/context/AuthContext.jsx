import { createContext, useState, useContext, useEffect } from 'react';
import { authService } from '../services/perfumeService';

/* eslint react-hooks/set-state-in-effect: "off", react-refresh/only-export-components: "off" */

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const storedAdmin = localStorage.getItem('admin');
    if (storedAdmin && token) {
      try {
        setAdmin(JSON.parse(storedAdmin));
      } catch {
        localStorage.removeItem('admin');
        localStorage.removeItem('token');
      }
    }
  }, [token]);

  const login = async (email, password) => {
    setLoading(true);
    setError(null);
    try {
      const response = await authService.login(email, password);
      const { token, admin } = response.data.data;
      
      setToken(token);
      setAdmin(admin);
      localStorage.setItem('token', token);
      localStorage.setItem('admin', JSON.stringify(admin));
      
      return response.data;
    } catch (err) {
      const message = err.response?.data?.message || 'Login failed';
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const register = async (email, password) => {
    setLoading(true);
    setError(null);
    try {
      const response = await authService.register(email, password);
      return response.data;
    } catch (err) {
      const message = err.response?.data?.message || 'Registration failed';
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    authService.logout();
    setAdmin(null);
    setToken(null);
  };

  const value = {
    admin,
    token,
    loading,
    error,
    login,
    register,
    logout,
    isAuthenticated: !!token && !!admin
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
