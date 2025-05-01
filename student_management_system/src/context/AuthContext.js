import React, { createContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode'; // Corrected import
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [authTokens, setAuthTokens] = useState(() =>
    localStorage.getItem('authTokens')
      ? JSON.parse(localStorage.getItem('authTokens'))
      : null
  );
  const [user, setUser] = useState(() =>
    authTokens ? jwtDecode(authTokens.access) : null // Corrected usage
  );

  // Login: POST to /api/token/, save tokens and user info
  const loginUser = async (username, password) => {
    try {
      const response = await axios.post('/api/token/', { username, password });
      if (response.status === 200) {
        setAuthTokens(response.data);
        setUser(jwtDecode(response.data.access)); // Corrected usage
        localStorage.setItem('authTokens', JSON.stringify(response.data));
        const decoded = jwtDecode(response.data.access); // Corrected usage
        if (decoded.is_superuser) {
          navigate('/admin');
        } else if (decoded.user_type === 'student') {
          navigate('/student');
        } else {
          navigate('/login');
        }
      }
    } catch (error) {
      console.error('Login failed', error);
      alert('Invalid credentials');
    }
  };

  // Logout: clear tokens and redirect to login
  const logoutUser = () => {
    setAuthTokens(null);
    setUser(null);
    localStorage.removeItem('authTokens');
    navigate('/login');
  };

  // Refresh token using /api/token/refresh/
  const updateToken = async () => {
    try {
      const response = await axios.post('/api/token/refresh/', {
        refresh: authTokens?.refresh,
      });
      if (response.status === 200) {
        setAuthTokens(response.data);
        setUser(jwtDecode(response.data.access)); // Corrected usage
        localStorage.setItem('authTokens', JSON.stringify(response.data));
      } else {
        logoutUser();
      }
    } catch (error) {
      logoutUser();
    }
  };

  // When tokens change, update the user state
  useEffect(() => {
    if (authTokens) {
      const decoded = jwtDecode(authTokens.access); // Corrected usage
      setUser(decoded);
    }
  }, [authTokens]);

  // Periodically refresh token every 4 minutes
  useEffect(() => {
    const fourMinutes = 1000 * 60 * 4;
    let interval = setInterval(() => {
      if (authTokens) {
        updateToken();
      }
    }, fourMinutes);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authTokens]);

  // Refresh token on mount if tokens exist
  useEffect(() => {
    if (authTokens) {
      updateToken();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Attach JWT to every Axios request
  useEffect(() => {
    const interceptor = axios.interceptors.request.use((config) => {
      if (authTokens) {
        config.headers.Authorization = `Bearer ${authTokens.access}`; // Fixed template string
      }
      return config;
    });
    return () => {
      axios.interceptors.request.eject(interceptor);
    };
  }, [authTokens]);

  return (
    <AuthContext.Provider
      value={{ user, authTokens, loginUser, logoutUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};
