import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Auth from './pages/Auth.jsx';
import Login from './pages/Login.jsx';
import Choose from './pages/Choose.jsx';
import AuthRegister from './pages/AuthRegister.jsx';
import AuthLogin from './pages/authLogin.jsx';
import Dashboard from './pages/dashboard.jsx';
import './App.css';

function App() {
  const [loggedin, setLoggedin] = useState(false);

  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<Auth />} />
        <Route path="/login" element={<Login loggedin={loggedin} setLoggedin={setLoggedin} />} />
        <Route path="/choose" element={<Choose />} />
        <Route path="/authority-login" element={<AuthLogin />} />
        <Route path="/authority-register" element={<AuthRegister />} />
        <Route path="/dashboard" element={<Dashboard />} />
        
        {/* ✅ Protected Home Route */}
        
        <Route path="/" element={loggedin ? <Dashboard /> : <Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}
//TODO: Dashboard has to changed to Home once amogh is done with it, home route should be set to home
export default App;
