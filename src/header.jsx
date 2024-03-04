import React, { useRef } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import './header.css'; // Ensure your CSS file is named correctly and imported

function Navbar() {
    const navRef = useRef();
    const toggleNav = () => {
        navRef.current.classList.toggle('show');
    };

    return (
        <header className="navbar">
            <a href="/" className="logo">Logo</a> {/* Assuming you have a logo here */}
            <nav ref={navRef} className="nav-links">
                <a href="#login">Account</a>
                <a href="#home">Home</a>
                <a href="#about">About Us</a>
                <a href="#contact">Contact</a>
            </nav>
            <button className="menu-toggle" onClick={toggleNav}>
                <FaBars />
            </button>
        </header>
    );
}

export default Navbar;
