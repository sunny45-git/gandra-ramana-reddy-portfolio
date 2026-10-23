import React, { createContext, useContext, useState, useEffect } from 'react';
import { apiService } from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => localStorage.getItem('gandra_admin_token'));
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('gandra_admin_user');
    return saved ? JSON.parse(saved) : null;
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifyUser = async () => {
      if (token) {
        try {
          const res = await apiService.getMe();
          setUser(res.user);
          localStorage.setItem('gandra_admin_user', JSON.stringify(res.user));
        } catch (err) {
          // Only clear session if explicitly rejected as 401/403 by server
          if (err.response && (err.response.status === 401 || err.response.status === 403)) {
            logout();
          } else {
            console.warn('API unreachable during session verification, keeping current token');
          }
        }
      }
      setLoading(false);
    };

    verifyUser();
  }, [token]);

  const login = async (email, password) => {
    const res = await apiService.login({ email, password });
    if (res.token) {
      localStorage.setItem('gandra_admin_token', res.token);
      localStorage.setItem('gandra_admin_user', JSON.stringify(res.user));
      setToken(res.token);
      setUser(res.user);
    }
    return res;
  };

  const logout = () => {
    localStorage.removeItem('gandra_admin_token');
    localStorage.removeItem('gandra_admin_user');
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ token, user, isAuthenticated: !!token, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
