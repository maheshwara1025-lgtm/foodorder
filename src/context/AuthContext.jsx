// src/context/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import fetchWithAuth from '../services/api';

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState(null);

  // Initialize auth state from browser storage
  useEffect(() => {
    try {
      const storedToken = localStorage.getItem('authToken');
      const storedUser = localStorage.getItem('authUser');
      if (storedToken && storedUser && storedToken !== 'expired') {
        setUser(JSON.parse(storedUser));
        setToken(storedToken);
      }
    } catch (err) {
      console.error('Error hydrating auth state:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Login handler: Authenticates with POST /api/login and saves JWT
  const login = useCallback(async (email, password) => {
    setLoading(true);
    setAuthError(null);
    try {
      const response = await fetchWithAuth('/api/login', {
        method: 'POST',
        body: JSON.stringify({ email, password })
      });
      localStorage.setItem('authToken', response.token);
      localStorage.setItem('authUser', JSON.stringify(response.user));
      setUser(response.user);
      setToken(response.token);
      return { success: true, user: response.user };
    } catch (error) {
      setAuthError(error.message || 'Login failed. Please verify credentials.');
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  }, []);

  // Signup handler: Registers user with POST /api/signup without auto-logging in
  const signup = useCallback(async ({ name, email, phone, password }) => {
    setLoading(true);
    setAuthError(null);
    try {
      const response = await fetchWithAuth('/api/signup', {
        method: 'POST',
        body: JSON.stringify({ name, email, phone, password })
      });
      // Do NOT set user or token in localStorage or state here.
      // User must manually log in on the Login page.
      return { success: true, message: response.message || 'Account created successfully. Please sign in.' };
    } catch (error) {
      setAuthError(error.message || 'Signup failed.');
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  }, []);

  // Logout handler
  const logout = useCallback(() => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('authUser');
    setUser(null);
    setToken(null);
    setAuthError(null);
  }, []);

  // Force token expire for demonstration of 401 error handling
  const simulateTokenExpiry = useCallback(() => {
    localStorage.setItem('authToken', 'expired');
    setToken('expired');
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!user && !!token && token !== 'expired',
        loading,
        authError,
        setAuthError,
        login,
        signup,
        logout,
        simulateTokenExpiry
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export default AuthContext;
