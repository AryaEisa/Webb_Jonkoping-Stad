
import React, { useRef } from 'react';
import { NavLink } from 'react-router-dom';
import './header.css'; 
import { FaBars, FaTimes } from 'react-icons/fa';
import { useAuth } from './AuthContext';

function Navbar() {
  const { isLoggedIn } = useAuth();
  const navRef = useRef();

  const toggleNav = () => {
    navRef.current.classList.toggle('show');
  };

  return (
    <div>
      <nav className="navbar">
        <div className="logo">
          <NavLink to="/" className="logo"></NavLink>
        </div>
        <div className="nav-links" ref={navRef}>
            
          <NavLink to="/" className="nav-link">Home</NavLink>
          <NavLink to="/venues" className="nav-link">Venues</NavLink>
          {isLoggedIn ? (
            <>
                <NavLink to="/admin" className="nav-link">Admin</NavLink>
              <NavLink to="/login" className="nav-link">Logout</NavLink>
            </>
          ) : (
            <NavLink to="/login" className="nav-link">Login</NavLink>
          )}
        </div>
        <div className="menu-toggle" onClick={toggleNav}>
          {navRef.current?.classList.contains('show') ? <FaTimes /> : <FaBars />}
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
