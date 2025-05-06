import React, { useState } from 'react';
import API from '../api';

export default function RegisterTeacher() {
  const [form, setForm] = useState({
    user: { username: '', email: '', password: '' },
    subject: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post('register/teacher/', form); // Send the teacher data to backend
      alert('Teacher registered successfully');
      window.location.href = '/'; // Redirect to login page after successful registration
    } catch (err) {
      alert('Registration failed, please try again');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Register Teacher</h2>
      <input
        type="text"
        placeholder="Username"
        onChange={(e) => setForm({ ...form, user: { ...form.user, username: e.target.value } })}
        value={form.user.username}
      />
      <input
        type="email"
        placeholder="Email"
        onChange={(e) => setForm({ ...form, user: { ...form.user, email: e.target.value } })}
        value={form.user.email}
      />
      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setForm({ ...form, user: { ...form.user, password: e.target.value } })}
        value={form.user.password}
      />
      <input
        type="text"
        placeholder="Subject"
        onChange={(e) => setForm({ ...form, subject: e.target.value })}
        value={form.subject}
      />
      <button type="submit">Register</button>
    </form>
  );
}
