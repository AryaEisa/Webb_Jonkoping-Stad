// Login.jsx
import React, { useState, useEffect } from "react";
import './Login.css';
import { Link } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import axios from 'axios';
import { useAuth } from './AuthContext'; 

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState(""); 
  const [password, setPassword] = useState("");
  const { isLoggedIn, isAdmin, login, logout } = useAuth(); 
  useEffect(() => {
    const token = sessionStorage.getItem('token');
    if (token) {
      login();
    }
  }, []); 

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    try {
      console.log('Attempting login...');
      const response = await axios.post('http://localhost:3000/login', {
        username,
        password
      });
  
      console.log('Response received:', response);
  
      if (response.status === 200) {
        console.log('Response data:', response.data);
        const { isAdmin, username } = response.data; // Destructure the response data to extract isAdmin and username
        console.log('isAdmin:', isAdmin);
        console.log('Username:', username);
        login(username, isAdmin); // Update login status and isAdmin status using login function with the username
        console.log('Login successful');
      } else {
        console.log('Login failed');
      }
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };
  
  
  
  const handleLogout = () => {
    logout(); // Call logout function provided by useAuth hook
  };

  console.log('Login - isLoggedIn:', isLoggedIn);
  console.log('Login - isAdmin:', isAdmin);

  return (
    <div className="login-main">  
      <div className="login-right">
        <div className="login-right-container">
          <div className="login-logo">
          </div>
          <div className="login-center">
            <h2>Welcome back!</h2>
            <p>Please enter your details</p>
            {isLoggedIn ? (
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
                  <button type="submit">Log In</button>
    
                  <Link to="/register">Don't have an account? Register here</Link>
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
