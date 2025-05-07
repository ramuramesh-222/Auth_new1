import React, { useEffect, useState } from 'react';
import API from '../api';

export default function TeacherDashboard() {
  const [students, setStudents] = useState([]);
  const [selected, setSelected] = useState(null);
  const [marks, setMarks] = useState(0);

  const loadStudents = () => {
    API.get('teacher/students/').then(res => setStudents(res.data));
  };

  const updateMarks = async () => {
    await API.put(`teacher/student/${selected}/`, { marks });
    loadStudents();
  };

  useEffect(() => {
    loadStudents();
  }, []);

  return (
    <div>
      <h2>Teacher Panel</h2>
      {students.map((s) => (
        <div key={s.id}>
          {s.username} <button onClick={() => setSelected(s.id)}>Edit</button>
        </div>
      ))}
      {selected && (
        <>
          <input
            type="number"
            placeholder="Marks"
            value={marks}
            onChange={(e) => setMarks(e.target.value)}
          />
          <button onClick={updateMarks}>Update</button>
        </>
      )}
    </div>
  );
}
