import React from 'react';
import './App.css';

function App() {
  return (
    <div className="app-container">
      <nav className="navbar">
        <div className="logo">🩺 MedAssist AI</div>
        <div className="nav-links">
          <a href="#dashboard">Dashboard</a>
          <a href="#symptoms">Check Symptoms</a>
          <a href="#profile" className="profile-btn">User Profile</a>
        </div>
      </nav>

      <main className="hero-section">
        <h1>Welcome to MedAssist AI</h1>
        <p>Your intelligent medical symptom analysis and disease prediction system.</p>
        
        <div className="card-container">
          <div className="card">
            <h3>🔍 Check Symptoms</h3>
            <p>Enter your symptoms to get a preliminary disease prediction.</p>
            <button className="primary-btn">Start Assessment</button>
          </div>
          
          <div className="card">
            <h3>📋 Medical History</h3>
            <p>View your past assessments and saved medical conditions.</p>
            <button className="secondary-btn">View History</button>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
