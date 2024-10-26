// src/components/auth/Register.js
import React, { useState } from 'react';
import { TextField, Button, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://todo-app-o2jp.onrender.com/user/register', {
        username,
        password,
      });
      alert(response.data.message);
      setUsername('');
      setPassword('');
      navigate('/login');
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
      <Typography variant="h4">Register</Typography>
      <TextField
        margin="normal"
        required
        fullWidth
        label="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
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
        Register
      </Button>
    </Box>
  );
};

export default Register;
