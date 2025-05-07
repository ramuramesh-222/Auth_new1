import React, { useState } from 'react';
import API from '../api';

export default function AdminDashboard() {
  const [username, setUsername] = useState('');
  const [role, setRole] = useState('student');

  const register = async () => {
    const url = role === 'student' ? 'register/student/' : 'register/teacher/';
    try {
      await API.post(url, { username, password: 'test123' });
      alert(`${role} registered`);
    } catch {
      alert('Failed');
    }
  };

  return (
    <>
      <h2>Admin Panel</h2>
      <input placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
      <select onChange={(e) => setRole(e.target.value)}>
        <option value="student">Student</option>
        <option value="teacher">Teacher</option>
      </select>
      <button onClick={register}>Register</button>
    </>
  );
}
