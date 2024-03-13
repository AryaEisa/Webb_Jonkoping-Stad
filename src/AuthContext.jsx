// AuthContext.jsx
import React, { createContext, useState, useContext, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  // Check for authentication status in local storage when component mounts
  useEffect(() => {
    const isAuthenticated = localStorage.getItem('isLoggedIn');
    const isAdmin = localStorage.getItem('isAdmin');
    if (isAuthenticated === 'true') {
      setIsLoggedIn(true);
      setIsAdmin(isAdmin === 'true');
    }
  }, []);

  const login = (adminStatus = false) => {
    setIsLoggedIn(true);
    setIsAdmin(adminStatus);
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('isAdmin', adminStatus ? 'true' : 'false');
  };

  const logout = () => {
    setIsLoggedIn(false);
    setIsAdmin(false);
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('isAdmin');
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, isAdmin, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const authContext = useContext(AuthContext);
  console.log('useAuth - isLoggedIn:', authContext.isLoggedIn);
  console.log('useAuth - isAdmin:', authContext.isAdmin);
  return authContext;
};
