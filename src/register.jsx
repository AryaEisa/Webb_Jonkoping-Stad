import React, { useState } from "react";
import axios from 'axios';

const Register = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState(""); // State to manage the message

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };
    
    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            console.log('Attempting registration');
            const response = await axios.post('http://localhost:3000/register', {
                username,
                password
            });
        
            console.log('Response received:', response);
        
            if (response.status === 200) {
                console.log('Registration successful');
                setMessage("Registered user!"); // Set the message to indicate successful registration
            } else {
                console.log('Registration failed');
                setMessage("Registration failed. Please try again."); // Set the message to indicate failed registration
            }
        } catch (error) {
            console.error('Error registering:', error);
            setMessage("An error occurred. Please try again later."); // Set the message to indicate error during registration
        }
    };
    
    return(
        <div>
            <h2>Register</h2>
            {message && <p>{message}</p>} {/* Display the message if it exists */}
            <form onSubmit={handleSubmit}>
                <input type="text" value={username} onChange={handleUsernameChange} placeholder="Username" />
                <input type="password" value={password} onChange={handlePasswordChange} placeholder="Password" />
                <button type="submit">Register</button>
            </form>
        </div>
    );
};
export default Register;
