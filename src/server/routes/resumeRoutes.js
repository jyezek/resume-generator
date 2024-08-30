const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User'); // Import the User model





import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import MasterResumeBuilder from './components/MasterResumeBuilder';
import ViewResume from './components/ViewResume'; // Import the new component

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const session = localStorage.getItem('userSession');
    if (session) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = () => {
    localStorage.setItem('userSession', 'active');
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('userSession');
    setIsLoggedIn(false);
  };

  return (
    <Router>
      <Routes>
        <Route 
          path="/login" 
          element={isLoggedIn ? <Navigate to="/dashboard" /> : <Login onLogin={handleLogin} />} 
        />
        <Route 
          path="/dashboard" 
          element={isLoggedIn ? <Dashboard onLogout={handleLogout} /> : <Navigate to="/login" />} 
        />
        <Route 
          path="/create-master-resume" 
          element={isLoggedIn ? <MasterResumeBuilder userId="exampleUser123" editMode={false} /> : <Navigate to="/login" />} 
        />
        <Route 
          path="/edit-master-resume" 
          element={isLoggedIn ? <MasterResumeBuilder userId="exampleUser123" editMode={true} /> : <Navigate to="/login" />} 
        />
        <Route 
          path="/view-resume" 
          element={isLoggedIn ? <ViewResume userId="exampleUser123" /> : <Navigate to="/login" />} 
        />
        <Route 
          path="*" 
          element={<Navigate to={isLoggedIn ? "/dashboard" : "/login"} />} 
        />
      </Routes>
    </Router>
  );
};

export default App;
