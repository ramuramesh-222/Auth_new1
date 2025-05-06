import React, { useEffect, useState } from 'react';
import API from '../api';

export default function StudentDashboard() {
  const [studentData, setStudentData] = useState(null);

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const res = await API.get('student/me/'); // Fetch logged-in student data
        setStudentData(res.data);
      } catch (err) {
        alert('Failed to fetch student data');
      }
    };
    fetchStudentData();
  }, []);

  if (!studentData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Welcome, {studentData.user.username}</h2>
      <p>Roll Number: {studentData.roll_number}</p>
      <p>Class: {studentData.class_name}</p>
      <h3>Marks</h3>
      <ul>
        {studentData.marks.map((mark, index) => (
          <li key={index}>
            {mark.subject}: {mark.score}
          </li>
        ))}
      </ul>
    </div>
  );
}
