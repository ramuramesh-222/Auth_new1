import React, { useState, useEffect } from 'react';
import API from '../api';

export default function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ username: '', email: '', role: '' });

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await API.get('admin/users/'); // Fetch all users (students, teachers, etc.)
        setUsers(res.data);
      } catch (err) {
        alert('Failed to fetch users');
      }
    };
    fetchUsers();
  }, []);

  const handleAddUser = async () => {
    try {
      await API.post('admin/users/', newUser); // Add new user (student/teacher)
      setUsers([...users, newUser]);
      setNewUser({ username: '', email: '', role: '' }); // Clear form
    } catch (err) {
      alert('Failed to add user');
    }
  };

  return (
    <div>
      <h2>Admin Dashboard</h2>
      <h3>Manage Users</h3>
      <ul>
        {users.map((user, index) => (
          <li key={index}>
            {user.username} - {user.email} - {user.role}
          </li>
        ))}
      </ul>

      <h3>Add New User</h3>
      <input
        type="text"
        placeholder="Username"
        value={newUser.username}
        onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
      />
      <input
        type="email"
        placeholder="Email"
        value={newUser.email}
        onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
      />
      <select
        value={newUser.role}
        onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
      >
        <option value="">Select Role</option>
        <option value="student">Student</option>
        <option value="teacher">Teacher</option>
      </select>
      <button onClick={handleAddUser}>Add User</button>
    </div>
  );
}
