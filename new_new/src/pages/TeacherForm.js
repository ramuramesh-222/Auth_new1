import React, { useState } from 'react';
import api from '../api/axios';

function TeacherForm() {
  const [data, setData] = useState({
    username: '',
    email: '',
    password: '',
    subject: '',
    employee_id: '',
  });

  const handleChange = e => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await api.post('teachers/', {
        user: {
          username: data.username,
          email: data.email,
          password: data.password,
        },
        subject: data.subject,
        employee_id: data.employee_id,
      });
      alert('Teacher registered');
    } catch (err) {
      console.error(err);
      alert('Registration failed');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Register Teacher</h2>
      <input name="username" placeholder="Username" onChange={handleChange} />
      <input name="email" placeholder="Email" onChange={handleChange} />
      <input name="password" type="password" placeholder="Password" onChange={handleChange} />
      <input name="subject" placeholder="Subject" onChange={handleChange} />
      <input name="employee_id" placeholder="Employee ID" onChange={handleChange} />
      <button type="submit">Register</button>
    </form>
  );
}

export default TeacherForm;
