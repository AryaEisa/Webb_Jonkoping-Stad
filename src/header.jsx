import React, { useRef } from 'react';
import { NavLink } from 'react-router-dom';
import './header.css'; // Ensure your CSS file is named correctly and imported


import { Link } from 'react-router-dom'; // Import Link from React Router
function Navbar() {
    const navRef = useRef();
    const toggleNav = () => {
        navRef.current.classList.toggle('show');
    };

    return (
        <nav className='navbar'>
            <NavLink to='/'>Home</NavLink>
            <NavLink to='/login'>Login</NavLink>
            <NavLink to='/venues'>Venues</NavLink>
        </nav>
    );
}

export default Navbar;



