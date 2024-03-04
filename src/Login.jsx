

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import './Login.css'; //

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Login details:', username, password);
  };

  return (
    <div className="form-container" id="login">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label">Username:</label>
          <input className="form-input" type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </div>
        <div className="form-group">
          <label className="form-label">Password:</label>
          <input className="form-input" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button className="form-submit" type="submit">Logga in</button>
      </form>
    </div>
  );
}

export default Login;
