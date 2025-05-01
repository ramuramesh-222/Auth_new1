import React, { useEffect, useState } from 'react';
import API from '../services/api';
import { useNavigate } from 'react-router-dom';

function StudentList() {
  const [students, setStudents] = useState([]);
  const navigate = useNavigate();

  const fetchStudents = async () => {
    const res = await API.get('students/');
    setStudents(res.data);
  };

  const deleteStudent = async (id) => {
    await API.delete(`students/${id}/`);
    fetchStudents();
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  return (
    <div>
      <h2>Student List</h2>
      <button onClick={() => navigate('/add-student')}>Add Student</button>
      <button onClick={() => navigate('/register')}>Add Teacher</button>

      <button onClick={handleLogout} style={{ float: 'right' }}>Logout</button>
      <ul>
        {students.map(student => (
          <li key={student.id}>
            {student.name} - {student.course}
            <button onClick={() => navigate(`/edit-student/${student.id}`)}>Edit</button>
            <button onClick={() => deleteStudent(student.id)}>Delete</button>
          </li> 
        ))}
      </ul>
    </div>
  );
}

export default StudentList;