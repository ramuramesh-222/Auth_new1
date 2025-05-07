import React from 'react';
import { Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const ProtectedRoute = ({ children, role }) => {
  const token = localStorage.getItem('access');
  if (!token) return <Navigate to="/" />;
  const user = jwtDecode(token);
  if (user.role !== role) return <Navigate to="/" />;
  return children;
};

export default ProtectedRoute;
