import React, { useState } from "react";
import './Login.css';
import Image from "./assets/image.png";
import Logo from "./assets/logo.png";
import GoogleSvg from "./assets/icons8-google.svg";
import { FaEye } from "react-icons/fa6";
import { FaEyeSlash } from "react-icons/fa6";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState(""); 
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false); // New state variable for tracking login status

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    try {
      const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
      });
  
      if (response.ok) {
        setIsLoggedIn(true); // Update login status if login is successful
        console.log('Login successful');
      } else {
        console.log('Login failed');
      }
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false); // Set login status to false on logout
    // You may also need to perform additional logout operations, like clearing session data
  };

  return (
    <div className="login-main">  
      <div className="login-right">
        <div className="login-right-container">
          <div className="login-logo">
          </div>
          <div className="login-center">
            <h2>Welcome back!</h2>
            <p>Please enter your details</p>
            {isLoggedIn ? ( // Conditional rendering based on login status
              <div>
                <p>You are logged in!</p>
                <button onClick={handleLogout}>Sign Out</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <input 
                  type="text" 
                  placeholder="Username" 
                  value={username} 
                  onChange={handleUsernameChange} 
                />
                <div className="pass-input-div">
                  <input 
                    type={showPassword ? "text" : "password"} 
                    placeholder="Password" 
                    value={password} 
                    onChange={handlePasswordChange} 
                  />
                  {showPassword ? <FaEyeSlash onClick={() => setShowPassword(!showPassword)} /> : <FaEye onClick={() => setShowPassword(!showPassword)} />}
                </div>
                <div className="login-center-options">
                  <div className="remember-div">
                    <input type="checkbox" id="remember-checkbox" />
                    <label htmlFor="remember-checkbox">
                      Remember for 30 days
                    </label>
                  </div>
                  <a href="#" className="forgot-pass-link">
                    Forgot password?
                  </a>
                </div>
                <div className="login-center-buttons">
                  <button type="submit">Log In</button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;