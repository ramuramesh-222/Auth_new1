// import React, { useState, useEffect } from 'react';
// import API from '../services/api';
// import { useNavigate, useParams } from 'react-router-dom';

// function StudentForm({ editMode }) {
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [course, setCourse] = useState('');
//   const navigate = useNavigate();
//   const { id } = useParams();

//   useEffect(() => {
//     if (editMode && id) {
//       API.get(`students/${id}/`).then(res => {
//         setName(res.data.name);
//         setEmail(res.data.email);
//         setCourse(res.data.course);
//       });
//     }
//   }, [editMode, id]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const payload = { name, email, course };
//     if (editMode) {
//       await API.put(`students/${id}/`, payload);
//     } else {
//       await API.post('students/', payload);
//     }
//     navigate('/students');
//   };

//   return (
//     <div>
//       <h2>{editMode ? 'Edit Student' : 'Add Student'}</h2>
//       <form onSubmit={handleSubmit}>
//         <input value={name} onChange={e => setName(e.target.value)} placeholder="Name" required />
//         <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" type="email" required />
//         <input value={course} onChange={e => setCourse(e.target.value)} placeholder="Course" required />
//         <button type="submit">{editMode ? 'Update' : 'Submit'}</button>
//       </form>
//     </div>
//   );
// }

// export default StudentForm;



import React, { useState } from 'react';
import api from '../api/axios';

function StudentForm() {
  const [data, setData] = useState({
    username: '',
    email: '',
    password: '',
    roll_number: '',
    class_name: '',
  });

  const handleChange = e => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await api.post('students/', {
        user: {
          username: data.username,
          email: data.email,
          password: data.password,
        },
        roll_number: data.roll_number,
        class_name: data.class_name,
      });
      alert('Student registered');
    } catch (err) {
      console.error(err);
      alert('Registration failed');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Register Student</h2>
      <input name="username" placeholder="Username" onChange={handleChange} />
      <input name="email" placeholder="Email" onChange={handleChange} />
      <input name="password" type="password" placeholder="Password" onChange={handleChange} />
      <input name="roll_number" placeholder="Roll Number" onChange={handleChange} />
      <input name="class_name" placeholder="Class" onChange={handleChange} />
      <button type="submit">Register</button>
    </form>
  );
}

export default StudentForm;
