// src/components/EditStudent.js
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API from '../services/api';  // use custom Axios instance

const EditStudent = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [student, setStudent] = useState({
    name: '',
    email: '',
    course: ''
  });

  useEffect(() => {
    API.get(`students/${id}/`)
      .then(res => setStudent(res.data))
      .catch(err => console.error(err));
  }, [id]);

  const handleChange = (e) => {
    setStudent({ ...student, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    API.put(`students/${id}/`, student)
      .then(() => {
        alert('Student updated!');
        navigate('/students');
      })
      .catch(err => console.error(err));
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Edit Student</h2>
      <input
        type="text"
        name="name"
        value={student.name}
        onChange={handleChange}
        placeholder="Name"
        required
      />
      <input
        type="email"
        name="email"
        value={student.email}
        onChange={handleChange}
        placeholder="Email"
        required
      />
      <input
        type="text"
        name="course"
        value={student.course}
        onChange={handleChange}
        placeholder="Course"
        required
      />
      <button type="submit">Update</button>
    </form>
  );
};

export default EditStudent;
