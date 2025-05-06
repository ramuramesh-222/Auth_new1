import React, { useState, useEffect } from 'react';
import API from '../api';

export default function TeacherDashboard() {
  const [students, setStudents] = useState([]);
  const [newStudent, setNewStudent] = useState({ username: '', roll_number: '', class_name: '' });

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const res = await API.get('teacher/students/'); // Fetch list of students
        setStudents(res.data);
      } catch (err) {
        alert('Failed to fetch students');
      }
    };
    fetchStudents();
  }, []);

  const handleAddStudent = async () => {
    try {
      await API.post('teacher/students/', newStudent); // Add new student
      setStudents([...students, newStudent]);
      setNewStudent({ username: '', roll_number: '', class_name: '' }); // Clear form
    } catch (err) {
      alert('Failed to add student');
    }
  };

  return (
    <div>
      <h2>Teacher Dashboard</h2>
      <h3>Manage Students</h3>
      <ul>
        {students.map((student, index) => (
          <li key={index}>
            {student.username} - {student.roll_number} - {student.class_name}
          </li>
        ))}
      </ul>

      <h3>Add New Student</h3>
      <input
        type="text"
        placeholder="Username"
        value={newStudent.username}
        onChange={(e) => setNewStudent({ ...newStudent, username: e.target.value })}
      />
      <input
        type="text"
        placeholder="Roll Number"
        value={newStudent.roll_number}
        onChange={(e) => setNewStudent({ ...newStudent, roll_number: e.target.value })}
      />
      <input
        type="text"
        placeholder="Class"
        value={newStudent.class_name}
        onChange={(e) => setNewStudent({ ...newStudent, class_name: e.target.value })}
      />
      <button onClick={handleAddStudent}>Add Student</button>
    </div>
  );
}
