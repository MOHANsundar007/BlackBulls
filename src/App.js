import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; 
import Home from './components/Home'; 
import Header from './components/Header';
import Patients from './components/Dashboard';
import Profile from './components/Profile';
import Community from './components/Community';
import Login from './components/Login';
import Drug from './components/Drug';
import Imgcap from './components/Imgcap';
import Queries from './components/Queries';


function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
        <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/dashboard" element={<Patients />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/community" element={<Community />} />
          <Route path="/drug" element={<Drug />}/>
        <Route path="/imgcap" element={<Imgcap/>}/>
        <Route path ="/queries" element = {<Queries/>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;