// src/components/auth/Logout.js
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = ({ setToken, setUsername }) => {
  const navigate = useNavigate();

  useEffect(() => {
    setToken(null);
    setUsername(null);
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    navigate('/login'); // Redirect to login page after logout
  }, [navigate, setToken, setUsername]);

  return null;
};

export default Logout;
