import React, { useEffect, useState } from 'react';
import API from '../api';

export default function StudentDashboard() {
  const [data, setData] = useState(null);
  useEffect(() => {
    API.get('student/profile/').then(res => setData(res.data));
  }, []);
  return data ? (
    <div>
      <h2>Welcome {data.user.username}</h2>
      <p>Marks: {data.marks}</p>
    </div>
  ) : (
    <p>Loading...</p>
  );
}
