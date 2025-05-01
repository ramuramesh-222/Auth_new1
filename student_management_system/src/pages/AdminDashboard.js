import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminDashboard = () => {
  const [students, setStudents] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [newStudentName, setNewStudentName] = useState('');
  const [newTeacherName, setNewTeacherName] = useState('');
  const [editStudentId, setEditStudentId] = useState(null);
  const [editStudentName, setEditStudentName] = useState('');
  const [editTeacherId, setEditTeacherId] = useState(null);
  const [editTeacherName, setEditTeacherName] = useState('');

  // Fetch the lists of students and teachers when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const studentsRes = await axios.get('/api/students/');
        const teachersRes = await axios.get('/api/teachers/');
        setStudents(studentsRes.data);
        setTeachers(teachersRes.data);
      } catch (error) {
        console.error('Error fetching data', error);
      }
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Add a new student
  const handleAddStudent = async () => {
    try {
      const res = await axios.post('/api/students/', { name: newStudentName });
      setStudents([...students, res.data]);
      setNewStudentName('');
    } catch (error) {
      console.error('Error adding student', error);
    }
  };

  // Add a new teacher
  const handleAddTeacher = async () => {
    try {
      const res = await axios.post('/api/teachers/', { name: newTeacherName });
      setTeachers([...teachers, res.data]);
      setNewTeacherName('');
    } catch (error) {
      console.error('Error adding teacher', error);
    }
  };

  // Begin editing a student
  const handleEditStudent = (id, currentName) => {
    setEditStudentId(id);
    setEditStudentName(currentName);
  };

  // Cancel editing student
  const handleCancelEditStudent = () => {
    setEditStudentId(null);
    setEditStudentName('');
  };

  // Save updated student
  const handleUpdateStudent = async (id) => {
    try {
      const res = await axios.put(`/api/students/${id}/`, { name: editStudentName });
      setStudents(students.map((st) => (st.id === id ? res.data : st)));
      setEditStudentId(null);
      setEditStudentName('');
    } catch (error) {
      console.error('Error updating student', error);
    }
  };

  // Delete a student
  const handleDeleteStudent = async (id) => {
    try {
      await axios.delete(`/api/students/${id}/`);
      setStudents(students.filter((st) => st.id !== id));
    } catch (error) {
      console.error('Error deleting student', error);
    }
  };

  // Begin editing a teacher
  const handleEditTeacher = (id, currentName) => {
    setEditTeacherId(id);
    setEditTeacherName(currentName);
  };

  // Cancel editing teacher
  const handleCancelEditTeacher = () => {
    setEditTeacherId(null);
    setEditTeacherName('');
  };

  // Save updated teacher
  const handleUpdateTeacher = async (id) => {
    try {
      const res = await axios.put(`/api/teachers/${id}/`, { name: editTeacherName });
      setTeachers(teachers.map((t) => (t.id === id ? res.data : t)));
      setEditTeacherId(null);
      setEditTeacherName('');
    } catch (error) {
      console.error('Error updating teacher', error);
    }
  };

  // Delete a teacher
  const handleDeleteTeacher = async (id) => {
    try {
      await axios.delete(`/api/teachers/${id}/`);
      setTeachers(teachers.filter((t) => t.id !== id));
    } catch (error) {
      console.error('Error deleting teacher', error);
    }
  };

  return (
    <div>
      <h2>Admin Dashboard</h2>
      <div>
        <h3>Students</h3>
        <input
          type="text"
          placeholder="New student name"
          value={newStudentName}
          onChange={(e) => setNewStudentName(e.target.value)}
        />
        <button onClick={handleAddStudent}>Add Student</button>
        <ul>
          {students.map((student) => (
            <li key={student.id}>
              {editStudentId === student.id ? (
                <>
                  <input
                    type="text"
                    value={editStudentName}
                    onChange={(e) => setEditStudentName(e.target.value)}
                  />
                  <button onClick={() => handleUpdateStudent(student.id)}>Save</button>
                  <button onClick={handleCancelEditStudent}>Cancel</button>
                </>
              ) : (
                <>
                  {student.name}{' '}
                  <button onClick={() => handleEditStudent(student.id, student.name)}>
                    Edit
                  </button>{' '}
                  <button onClick={() => handleDeleteStudent(student.id)}>
                    Delete
                  </button>
                </>
              )}
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h3>Teachers</h3>
        <input
          type="text"
          placeholder="New teacher name"
          value={newTeacherName}
          onChange={(e) => setNewTeacherName(e.target.value)}
        />
        <button onClick={handleAddTeacher}>Add Teacher</button>
        <ul>
          {teachers.map((teacher) => (
            <li key={teacher.id}>
              {editTeacherId === teacher.id ? (
                <>
                  <input
                    type="text"
                    value={editTeacherName}
                    onChange={(e) => setEditTeacherName(e.target.value)}
                  />
                  <button onClick={() => handleUpdateTeacher(teacher.id)}>Save</button>
                  <button onClick={handleCancelEditTeacher}>Cancel</button>
                </>
              ) : (
                <>
                  {teacher.name}{' '}
                  <button onClick={() => handleEditTeacher(teacher.id, teacher.name)}>
                    Edit
                  </button>{' '}
                  <button onClick={() => handleDeleteTeacher(teacher.id)}>
                    Delete
                  </button>
                </>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AdminDashboard;
