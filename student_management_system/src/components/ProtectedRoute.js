import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user } = useContext(AuthContext);

  if (!user) {
    // Not logged in
    return <Navigate to="/login" />;
  }

  // Determine user role from JWT payload
  let userRole = 'student';
  if (user.is_superuser) {
    userRole = 'admin';
  } else if (user.user_type) {
    userRole = user.user_type;
  }

  // Check if user's role is allowed
  if (!allowedRoles.includes(userRole)) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;
