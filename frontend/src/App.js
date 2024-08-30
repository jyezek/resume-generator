import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import MasterResumeBuilder from './components/MasterResumeBuilder';
import ResumeGenerationFlow from './components/ResumeGenerationFlow'; // Import the new component

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const userId = localStorage.getItem('userId');

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
          element={isLoggedIn ? <MasterResumeBuilder userId={userId} editMode={false} /> : <Navigate to="/login" />} 
        />
        <Route 
          path="/edit-master-resume" 
          element={isLoggedIn ? <MasterResumeBuilder userId={userId} editMode={true} /> : <Navigate to="/login" />} 
        />
        <Route 
          path="/resume-generation" 
          element={isLoggedIn ? <ResumeGenerationFlow userId={userId} /> : <Navigate to="/login" />} 
        />
<Route path="/resume-generation/:resumeId"  element={isLoggedIn ? <ResumeGenerationFlow userId={userId} /> : <Navigate to="/login" />}  />
        <Route 
          path="*" 
          element={<Navigate to={isLoggedIn ? "/dashboard" : "/login"} />} 
        />
      </Routes>
    </Router>
  );
};

export default App;


// import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Dashboard from './components/Dashboard';
// import ResumeGenerationFlow from './components/ResumeGenerationFlow';
// import MasterResumeBuilder from './components/MasterResumeBuilder';
// import Login from './components/Login';

// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/login" element={<Login />} />
//         <Route path="/dashboard" element={<Dashboard />} />
//         <Route path="/resume-generation" element={<ResumeGenerationFlow />} />
//         <Route path="/resume-generation/:resumeId" element={<ResumeGenerationFlow />} />
//         <Route path="/edit-master-resume" element={<MasterResumeBuilder />} />
//         <Route path="/create-master-resume" element={<MasterResumeBuilder />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;
