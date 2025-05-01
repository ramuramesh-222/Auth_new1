import React, { useState, useEffect, useContext } from 'react';
import AuthContext from '../context/AuthContext';
import axios from 'axios';

const StudentView = () => {
  const { user } = useContext(AuthContext);
  const [student, setStudent] = useState(null);

  useEffect(() => {
    if (user) {
      const fetchStudent = async () => {
        try {
          const response = await axios.get(`/api/students/${user.user_id}/`);
          setStudent(response.data);
        } catch (error) {
          console.error('Error fetching student data', error);
        }
      };
      fetchStudent();
    }
  }, [user]);

  return (
    <div>
      <h2>Student View</h2>
      {student ? (
        <div>
          <p>ID: {student.id}</p>
          <p>Name: {student.name}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default StudentView;
