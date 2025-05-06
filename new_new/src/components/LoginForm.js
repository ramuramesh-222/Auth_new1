import React, { useState } from 'react';
import API from '../api';

export default function LoginForm() {
  const [form, setForm] = useState({ username: '', password: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post('token/', form); // JWT token endpoint
      localStorage.setItem('access', res.data.access); // Store the access token
      localStorage.setItem('refresh', res.data.refresh); // Store the refresh token
      alert('Login successful');
      // Redirect based on the user role, you can set that based on your backend response
      // For example, check user role and navigate to respective dashboards
      window.location.href = '/student'; // Redirect to student dashboard for now (you can change logic)
    } catch (err) {
      alert('Invalid credentials');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>
      <input
        type="text"
        name="username"
        placeholder="Username"
        onChange={(e) => setForm({ ...form, username: e.target.value })}
        value={form.username}
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        onChange={(e) => setForm({ ...form, password: e.target.value })}
        value={form.password}
      />
      <button type="submit">Login</button>
    </form>
  );
}
