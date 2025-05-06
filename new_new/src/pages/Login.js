// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// function Login() {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const navigate = useNavigate();

//   const handleLogin = async () => {

//     try {
//       const res = await axios.post('http://localhost:8000/api/token/', {
//         username,
//         password
//       });
//       localStorage.setItem('access', res.data.access);
//       localStorage.setItem('refresh', res.data.refresh);
//       navigate('/students');
//       // navigate('/');  // Redirect to home

//     } catch (err) {
//       alert("Login failed!");
//     }
//   };

//   return (
//     <div>
//       <h2>Admin Login</h2>
//       <input onChange={e => setUsername(e.target.value)} placeholder="Username" />
//       <input onChange={e => setPassword(e.target.value)} placeholder="Password" type="password" />
//       <button onClick={handleLogin}>Login</button>
//     </div>
//   );
// }

// export default Login;




import React, { useState } from 'react';
import axios from 'axios';

function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:8000/api/token/', {
        username,
        password,
      });
      localStorage.setItem('access', res.data.access);
      localStorage.setItem('refresh', res.data.refresh);
      onLogin();
    } catch (err) {
      alert('Login failed');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>
      <input placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} />
      <input placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
      <button type="submit">Login</button>
    </form>
  );
}

export default Login;
