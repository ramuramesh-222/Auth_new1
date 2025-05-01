import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import StudentList from './pages/StudentList';
import StudentForm from './pages/StudentForm';
import EditStudent from './pages/EditStudents';
import Register from './pages/Register';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/students" element={<StudentList />} />
        <Route path="/register" element={<Register />} />
        <Route path="/add-student" element={<StudentForm />} />
        <Route path="/edit-student/:id" element={<EditStudent />} />

      </Routes>
    </Router>
  );
}

export default App;
