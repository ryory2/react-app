// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import OtpVerification from './pages/OtpVerification';
import Register from './pages/Register';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Login2 from './pages/Login2';
import Register2 from './pages/Register2';

const App: React.FC = () => {
  return (
    <Router>
      <CssBaseline />
      <Box display="flex" flexDirection="column" minHeight="100vh">
        <Header />
        <Box component="main" flexGrow={1}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/login2" element={<Login2 />} />
            <Route path="/Register2" element={<Register2 />} />
            <Route path="/otp-verification" element={<OtpVerification />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </Box>
        <Footer />
      </Box>
    </Router>
  );
};

export default App;
