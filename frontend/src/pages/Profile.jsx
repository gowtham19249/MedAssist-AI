import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { API_URL } from '../services/api';

export default function Profile() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        age: '',
        gender: 'Male',
        blood_pressure: 'Normal',
        cholesterol: 'Normal'
    });
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setError('');
        
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post(`${API_URL}/patient/profile`, formData, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setMessage("✅ Profile saved successfully!");
            setTimeout(() => navigate('/dashboard'), 1500);
        } catch (err) {
            setError(err.response?.data?.detail || "An error occurred");
        }
    };

    return (
        <div className="app-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', backgroundColor: '#f4f7fb' }}>
            <div style={{ backgroundColor: 'white', padding: '3rem', borderRadius: '12px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)', width: '400px' }}>
                <h2 style={{ color: '#2c3e50', marginBottom: '1.5rem', textAlign: 'center' }}>My Profile</h2>
                
                {message && <div style={{ backgroundColor: '#d4edda', color: '#155724', padding: '10px', borderRadius: '5px', marginBottom: '15px' }}>{message}</div>}
                {error && <div style={{ backgroundColor: '#f8d7da', color: '#721c24', padding: '10px', borderRadius: '5px', marginBottom: '15px' }}>❌ {error}</div>}

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div>
                        <label style={{ display: 'block', marginBottom: '5px', color: '#7f8c8d' }}>Age</label>
                        <input type="number" name="age" value={formData.age} onChange={handleChange} required style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }} />
                    </div>
                    
                    <div>
                        <label style={{ display: 'block', marginBottom: '5px', color: '#7f8c8d' }}>Gender</label>
                        <select name="gender" value={formData.gender} onChange={handleChange} style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>

                    <div>
                        <label style={{ display: 'block', marginBottom: '5px', color: '#7f8c8d' }}>Blood Pressure</label>
                        <select name="blood_pressure" value={formData.blood_pressure} onChange={handleChange} style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}>
                            <option value="Low">Low</option>
                            <option value="Normal">Normal</option>
                            <option value="High">High</option>
                        </select>
                    </div>

                    <div>
                        <label style={{ display: 'block', marginBottom: '5px', color: '#7f8c8d' }}>Cholesterol</label>
                        <select name="cholesterol" value={formData.cholesterol} onChange={handleChange} style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}>
                            <option value="Normal">Normal</option>
                            <option value="High">High</option>
                        </select>
                    </div>

                    <button type="submit" className="primary-btn" style={{ marginTop: '1rem' }}>SAVE PROFILE</button>
                </form>
                
                <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
                    <Link to="/dashboard" style={{ color: '#3498db', textDecoration: 'none' }}>← Back to Dashboard</Link>
                </div>
            </div>
        </div>
    );
}
