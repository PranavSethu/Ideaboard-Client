import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Signup from './page/Signup';
import Login from './page/Login';
import UserCapture from './page/UserCapture';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<Login />} />
        <Route path="/usercapture" element={<UserCapture/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
