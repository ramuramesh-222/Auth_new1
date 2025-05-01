import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const RegisterTeacher = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/register/', { username, password });
      if (response.status === 201 || response.status === 200) {
        alert('Teacher registered successfully');
        navigate('/admin');
      } else {
        console.error('Registration failed');
      }
    } catch (error) {
      console.error('Registration error', error);
      alert('Registration failed');
    }
  };

  return (
    <div>
      <h2>Register Teacher</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default RegisterTeacher;
