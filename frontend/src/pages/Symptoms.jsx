import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { API_URL } from '../services/api';

export default function Symptoms() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        fever: false,
        cough: false,
        fatigue: false,
        difficulty_breathing: false
    });
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.checked });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setError('');
        
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post(`${API_URL}/symptoms/`, formData, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setMessage("✅ " + response.data.message);
            setTimeout(() => navigate('/dashboard'), 2000);
        } catch (err) {
            setError(err.response?.data?.detail || err.response?.data?.error || "An error occurred");
        }
    };

    const checkboxStyle = { marginRight: '10px', width: '20px', height: '20px' };
    const rowStyle = { display: 'flex', alignItems: 'center', padding: '10px', backgroundColor: '#f8f9fa', borderRadius: '5px' };

    return (
        <div className="app-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', backgroundColor: '#f4f7fb' }}>
            <div style={{ backgroundColor: 'white', padding: '3rem', borderRadius: '12px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)', width: '400px' }}>
                <h2 style={{ color: '#2c3e50', marginBottom: '1.5rem', textAlign: 'center' }}>Log Symptoms</h2>
                
                {message && <div style={{ backgroundColor: '#d4edda', color: '#155724', padding: '10px', borderRadius: '5px', marginBottom: '15px' }}>{message}</div>}
                {error && <div style={{ backgroundColor: '#f8d7da', color: '#721c24', padding: '10px', borderRadius: '5px', marginBottom: '15px' }}>❌ {error}</div>}

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    
                    <div style={rowStyle}>
                        <input type="checkbox" name="fever" checked={formData.fever} onChange={handleChange} style={checkboxStyle} />
                        <label style={{ color: '#2c3e50', fontWeight: 'bold' }}>Fever</label>
                    </div>

                    <div style={rowStyle}>
                        <input type="checkbox" name="cough" checked={formData.cough} onChange={handleChange} style={checkboxStyle} />
                        <label style={{ color: '#2c3e50', fontWeight: 'bold' }}>Cough</label>
                    </div>

                    <div style={rowStyle}>
                        <input type="checkbox" name="fatigue" checked={formData.fatigue} onChange={handleChange} style={checkboxStyle} />
                        <label style={{ color: '#2c3e50', fontWeight: 'bold' }}>Fatigue</label>
                    </div>

                    <div style={rowStyle}>
                        <input type="checkbox" name="difficulty_breathing" checked={formData.difficulty_breathing} onChange={handleChange} style={checkboxStyle} />
                        <label style={{ color: '#2c3e50', fontWeight: 'bold' }}>Difficulty Breathing</label>
                    </div>

                    <button type="submit" className="primary-btn" style={{ marginTop: '1rem' }}>SUBMIT SYMPTOMS</button>
                </form>
                
                <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
                    <Link to="/dashboard" style={{ color: '#3498db', textDecoration: 'none' }}>← Back to Dashboard</Link>
                </div>
            </div>
        </div>
    );
}
