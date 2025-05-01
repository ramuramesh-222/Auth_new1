// src/components/Register.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const navigate = useNavigate();

  const handleRegister = async () => {
    if (!username || !password) {
      return alert('Username and password are required');
    }

    try {
      const res = await axios.post('http://localhost:8000/register/', {
        username,
        password,
        name
      });
      alert('Registration successful!');
      navigate('/login');
    } catch (err) {
      alert(err.response?.data?.error || 'Registration failed');
    }
  };

  return (
    <div>
      <h2>Teacher Registration</h2>
      <input placeholder="Name" onChange={e => setName(e.target.value)} />
      <input placeholder="Username" onChange={e => setUsername(e.target.value)} />
      <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
      <button onClick={handleRegister}>Register</button>
    </div>
  );
};

export default Register;
