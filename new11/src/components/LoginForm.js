import React, { useState } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

export default function LoginForm() {
  const [form, setForm] = useState({ username: '', password: '' });
  const navigate = useNavigate();

  const login = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:8000/api/login/', form);

      // Save the JWT token to localStorage
      localStorage.setItem('access', res.data.access);

      // Decode the JWT to get the user's role
      const user = jwtDecode(res.data.access);

      // Navigate based on user role
      if (user.role === 'admin') {
        navigate('/admin'); // Navigate to the Admin Dashboard
      } else if (user.role === 'teacher') {
        navigate('/teacher'); // Navigate to the Teacher Dashboard
      } else if (user.role === 'student') {
        navigate('/student'); // Navigate to the Student Dashboard
      }
    } catch (err) {
      alert('Login failed');
    }
  };

  return (
    <form onSubmit={login}>
      <input
        type="text"
        placeholder="Username"
        onChange={(e) => setForm({ ...form, username: e.target.value })}
        required
      />
      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setForm({ ...form, password: e.target.value })}
        required
      />
      <button type="submit">Login</button>
    </form>
  );
}
