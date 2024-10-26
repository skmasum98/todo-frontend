// src/components/Footer.js
import React from 'react';
import { Box, Typography, Link } from '@mui/material';

const Footer = () => {
  return (
    <Box 
      sx={{ 
        position: 'fixed', 
        bottom: 0, 
        width: '100%', 
        backgroundColor: '#3f51b5', 
        color: 'white', 
        textAlign: 'center', 
        padding: '10px 0' 
      }}
    >
      <Typography variant="body1">
        &copy; {new Date().getFullYear()} <Link href="https://thewebpal.com" color="inherit">THEWEBPAL</Link>
      </Typography>
      <Typography variant="body2">
        Contact: <Link href="mailto:info@thewebpal.com" color="inherit">info@thewebpal.com</Link>
      </Typography>
    </Box>
  );
};

export default Footer;
