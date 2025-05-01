import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {

    try {
      const res = await axios.post('http://localhost:8000/api/token/', {
        username,
        password
      });
      localStorage.setItem('access', res.data.access);
      localStorage.setItem('refresh', res.data.refresh);
      navigate('/students');
      // navigate('/');  // Redirect to home

    } catch (err) {
      alert("Login failed!");
    }
  };

  return (
    <div>
      <h2>Admin Login</h2>
      <input onChange={e => setUsername(e.target.value)} placeholder="Username" />
      <input onChange={e => setPassword(e.target.value)} placeholder="Password" type="password" />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}

export default Login;