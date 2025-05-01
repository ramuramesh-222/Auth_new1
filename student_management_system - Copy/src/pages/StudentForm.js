import React, { useState, useEffect } from 'react';
import API from '../services/api';
import { useNavigate, useParams } from 'react-router-dom';

function StudentForm({ editMode }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [course, setCourse] = useState('');
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (editMode && id) {
      API.get(`students/${id}/`).then(res => {
        setName(res.data.name);
        setEmail(res.data.email);
        setCourse(res.data.course);
      });
    }
  }, [editMode, id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = { name, email, course };
    if (editMode) {
      await API.put(`students/${id}/`, payload);
    } else {
      await API.post('students/', payload);
    }
    navigate('/students');
  };

  return (
    <div>
      <h2>{editMode ? 'Edit Student' : 'Add Student'}</h2>
      <form onSubmit={handleSubmit}>
        <input value={name} onChange={e => setName(e.target.value)} placeholder="Name" required />
        <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" type="email" required />
        <input value={course} onChange={e => setCourse(e.target.value)} placeholder="Course" required />
        <button type="submit">{editMode ? 'Update' : 'Submit'}</button>
      </form>
    </div>
  );
}

export default StudentForm;