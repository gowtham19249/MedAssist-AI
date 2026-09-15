import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Dashboard() {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <div className="app-container" style={{ backgroundColor: '#f4f7fb', minHeight: '100vh', padding: '2rem' }}>
            <div style={{ maxWidth: '800px', margin: '0 auto', backgroundColor: 'white', padding: '2rem', borderRadius: '12px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', borderBottom: '2px solid #eee', paddingBottom: '1rem' }}>
                    <h1 style={{ color: '#2c3e50', margin: 0 }}>Patient Dashboard</h1>
                    <button onClick={handleLogout} style={{ padding: '8px 16px', backgroundColor: '#e74c3c', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Logout</button>
                </div>
                
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                    <div style={{ padding: '1.5rem', border: '1px solid #ddd', borderRadius: '8px' }}>
                        <h3 style={{ color: '#3498db', marginTop: 0 }}>📋 Step 1: My Profile</h3>
                        <p style={{ color: '#7f8c8d' }}>Update your vitals and medical statistics.</p>
                        <Link to="/profile">
                            <button className="primary-btn" style={{ width: '100%' }}>Edit Profile</button>
                        </Link>
                    </div>

                    <div style={{ padding: '1.5rem', border: '1px solid #ddd', borderRadius: '8px' }}>
                        <h3 style={{ color: '#3498db', marginTop: 0 }}>🤒 Step 2: Symptoms</h3>
                        <p style={{ color: '#7f8c8d' }}>Log how you are feeling today for AI analysis.</p>
                        <Link to="/symptoms">
                            <button className="primary-btn" style={{ width: '100%' }}>Log Symptoms</button>
                        </Link>
                    </div>
                </div>
                
                <div style={{ marginTop: '2rem', padding: '1.5rem', backgroundColor: '#f8f9fa', borderRadius: '8px', textAlign: 'center' }}>
                    <h3 style={{ color: '#7f8c8d', margin: 0 }}>🤖 AI Predictions Coming Soon</h3>
                </div>
            </div>
        </div>
    );
}
