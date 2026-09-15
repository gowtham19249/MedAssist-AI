import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import Register from './pages/Register';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import Symptoms from './pages/Symptoms';
import ProtectedRoute from './components/ProtectedRoute';

function Home() {
  const token = localStorage.getItem('token');

  return (
    <div className="app-container">
      <nav className="navbar">
        <div className="logo">🩺 MedAssist AI</div>
        <div className="nav-links">
          {token ? (
            <>
              <Link to="/dashboard" style={{ marginRight: '15px', color: '#2c3e50', textDecoration: 'none', fontWeight: '500' }}>Dashboard</Link>
              <button onClick={() => {
                  localStorage.removeItem('token');
                  window.location.reload();
              }} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#e74c3c', fontWeight: 'bold' }}>Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" style={{ marginRight: '15px', color: '#2c3e50', textDecoration: 'none', fontWeight: '500' }}>Login</Link>
              <Link to="/register" className="profile-btn">Register</Link>
            </>
          )}
        </div>
      </nav>

      <main className="hero-section">
        <h1>Welcome to MedAssist AI</h1>
        <p>Your intelligent medical symptom analysis and disease prediction system.</p>
        
        <div className="card-container">
          <div className="card">
            <h3>🔍 Check Symptoms</h3>
            <p>Enter your symptoms to get a preliminary disease prediction.</p>
            <Link to={token ? "/symptoms" : "/login"}>
              <button className="primary-btn">Start Assessment</button>
            </Link>
          </div>
          
          <div className="card">
            <h3>📋 Medical History</h3>
            <p>View your past assessments and saved medical conditions.</p>
            <Link to={token ? "/dashboard" : "/login"}>
              <button className="secondary-btn">View History</button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        
        {/* Secure Protected Routes */}
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        <Route path="/symptoms" element={<ProtectedRoute><Symptoms /></ProtectedRoute>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
