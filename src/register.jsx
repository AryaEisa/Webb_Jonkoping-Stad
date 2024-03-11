import React, { useState } from "react";
import axios from 'axios';

const Register = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    
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
                // Handle successful registration, e.g., redirect to login page
            } else {
                console.log('Registration failed');
                // Handle failed registration, e.g., display error message to user
            }
        } catch (error) {
            console.error('Error registering:', error);
            // Handle error, e.g., display error message to user
        }
    };
    
    return(
        <div>
            <h2>Register</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" value={username} onChange={handleUsernameChange} placeholder="Username" />
                <input type="password" value={password} onChange={handlePasswordChange} placeholder="Password" />
                <button type="submit">Register</button>
            </form>
        </div>
    );
};
export default Register;
