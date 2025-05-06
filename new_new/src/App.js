// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import RegisterStudent from './components/RegisterStudent';
import RegisterTeacher from './components/RegisterTeacher';
import StudentDashboard from './components/StudentDashboard';
import TeacherDashboard from './components/TeacherDashboard';
import AdminDashboard from './components/AdminDashboard';

export default function App() {
  return (
    <Router>
      <nav>
        <Link to="/">Login</Link> | 
        <Link to="/register-student">Register Student</Link> | 
        <Link to="/register-teacher">Register Teacher</Link>
      </nav>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/register-student" element={<RegisterStudent />} />
        <Route path="/register-teacher" element={<RegisterTeacher />} />
        <Route path="/student" element={<StudentDashboard />} />
        <Route path="/teacher" element={<TeacherDashboard />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </Router>
  );
}
