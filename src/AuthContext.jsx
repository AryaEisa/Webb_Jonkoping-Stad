// AuthContext.jsx
import React, { createContext, useState, useContext, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [user, setUser] = useState(null); // Add state for user's name

  // Check for authentication status and user info in session storage when component mounts
  useEffect(() => {
    const storedUser = sessionStorage.getItem('user');
    const storedIsAdmin = sessionStorage.getItem('isAdmin');
    if (storedUser && storedIsAdmin) {
      setUser(JSON.parse(storedUser)); // Parse the stored user object
      setIsLoggedIn(true);
      setIsAdmin(storedIsAdmin === 'true');
    }
  }, []);

  const login = (username, adminStatus = false) => {
    setUser({ name: username }); // Set the user object with the name property
    setIsLoggedIn(true);
    setIsAdmin(adminStatus);
    sessionStorage.setItem('user', JSON.stringify({ name: username })); // Store the user object as a string
    sessionStorage.setItem('isLoggedIn', 'true');
    sessionStorage.setItem('isAdmin', adminStatus ? 'true' : 'false');
  };

  const logout = () => {
    setUser(null);
    setIsLoggedIn(false);
    setIsAdmin(false);
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('isLoggedIn');
    sessionStorage.removeItem('isAdmin');
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, isAdmin, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const authContext = useContext(AuthContext);
  console.log('useAuth - isLoggedIn:', authContext.isLoggedIn);
  console.log('useAuth - isAdmin:', authContext.isAdmin);
  console.log('useAuth - user:', authContext.user);
  return authContext;
};
