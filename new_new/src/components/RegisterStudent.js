import React, { useState } from 'react';
import API from '../api';

export default function RegisterStudent() {
  const [form, setForm] = useState({
    user: { username: '', email: '', password: '' },
    roll_number: '',
    class_name: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post('register/student/', form); // Send the student data to backend
      alert('Student registered successfully');
      window.location.href = '/'; // Redirect to login page after successful registration
    } catch (err) {
      alert('Registration failed, please try again');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Register Student</h2>
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
        placeholder="Roll Number"
        onChange={(e) => setForm({ ...form, roll_number: e.target.value })}
        value={form.roll_number}
      />
      <input
        type="text"
        placeholder="Class"
        onChange={(e) => setForm({ ...form, class_name: e.target.value })}
        value={form.class_name}
      />
      <button type="submit">Register</button>
    </form>
  );
}
