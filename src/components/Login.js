// src/components/auth/Login.js
import React, { useState } from 'react';
import { TextField, Button, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = ({ setToken, setUsername }) => {
  const [username, setUsernameInput] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://todo-app-o2jp.onrender.com/user/login', {
        username,
        password,
      });
      const { token } = response.data;
      localStorage.setItem('token', token);
      localStorage.setItem('username', username);
      setToken(token);
      setUsername(username);
      navigate('/');
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
      <Typography variant="h4">Login</Typography>
      <TextField
        margin="normal"
        required
        fullWidth
        label="Username"
        value={username}
        onChange={(e) => setUsernameInput(e.target.value)}
      />
      <TextField
        margin="normal"
        required
        fullWidth
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button type="submit" fullWidth variant="contained" sx={{ mt: 2 }}>
        Login
      </Button>
    </Box>
  );
};

export default Login;
