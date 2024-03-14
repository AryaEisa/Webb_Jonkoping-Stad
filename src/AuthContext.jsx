// AuthContext.jsx
import React, { createContext, useState, useContext, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  // Check for authentication status in session storage when component mounts
  useEffect(() => {
    const isAuthenticated = sessionStorage.getItem('isLoggedIn');
    const isAdmin = sessionStorage.getItem('isAdmin');
    if (isAuthenticated === 'true') {
      setIsLoggedIn(true);
      setIsAdmin(isAdmin === 'true');
    }
  }, []);

  const login = (adminStatus = false) => {
    setIsLoggedIn(true);
    setIsAdmin(adminStatus);
    sessionStorage.setItem('isLoggedIn', 'true');
    sessionStorage.setItem('isAdmin', adminStatus ? 'true' : 'false');
  };

  const logout = () => {
    setIsLoggedIn(false);
    setIsAdmin(false);
    sessionStorage.removeItem('isLoggedIn');
    sessionStorage.removeItem('isAdmin');
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
