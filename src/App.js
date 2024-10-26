// src/App.js
import React, { useState, } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import Logout from './components/Logout';
import TaskList from './components/TaskList';
import { Container, AppBar, Toolbar, Typography, Button } from '@mui/material';
import Footer from './components/Footer';

const App = () => {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [username, setUsername] = useState(localStorage.getItem('username'));

  

  return (
    <Router>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            ToDo App
          </Typography>
          {username && (
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Hello, {username}
            </Typography>
          )}
          {!token ? (
            <>
              <Button color="inherit" component={Link} to="/login">Login</Button>
              <Button color="inherit" component={Link} to="/register">Register</Button>
            </>
          ) : (
            <Button color="inherit" component={Link} to="/logout">Logout</Button>
          )}
        </Toolbar>
      </AppBar>
      <Container>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login setToken={setToken} setUsername={setUsername} />} />
          <Route path="/" element={<TaskList token={token} />} />
          <Route path="/logout" element={<Logout setToken={setToken} setUsername={setUsername} />} />
        </Routes>
      </Container>
      <Footer />
    </Router>
  );
};

export default App;
