import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { API_URL } from '../services/api';

export default function Register() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        role: 'patient'
    });
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setError('');
        
        try {
            const response = await axios.post(`${API_URL}/auth/register`, formData);
            setMessage(response.data.message);
        } catch (err) {
            setError(err.response?.data?.detail || "An error occurred");
        }
    };

    return (
        <div className="app-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', backgroundColor: '#f4f7fb' }}>
            <div style={{ backgroundColor: 'white', padding: '3rem', borderRadius: '12px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)', width: '400px' }}>
                <h2 style={{ color: '#2c3e50', marginBottom: '1.5rem', textAlign: 'center' }}>Create Account</h2>
                
                {message && <div style={{ backgroundColor: '#d4edda', color: '#155724', padding: '10px', borderRadius: '5px', marginBottom: '15px' }}>✅ {message}</div>}
                {error && <div style={{ backgroundColor: '#f8d7da', color: '#721c24', padding: '10px', borderRadius: '5px', marginBottom: '15px' }}>❌ {error}</div>}

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div>
                        <label style={{ display: 'block', marginBottom: '5px', color: '#7f8c8d' }}>Name</label>
                        <input type="text" name="name" value={formData.name} onChange={handleChange} required style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }} />
                    </div>
                    
                    <div>
                        <label style={{ display: 'block', marginBottom: '5px', color: '#7f8c8d' }}>Email</label>
                        <input type="email" name="email" value={formData.email} onChange={handleChange} required style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }} />
                    </div>
                    
                    <div>
                        <label style={{ display: 'block', marginBottom: '5px', color: '#7f8c8d' }}>Password</label>
                        <input type="password" name="password" value={formData.password} onChange={handleChange} required style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }} />
                    </div>
                    
                    <div>
                        <label style={{ display: 'block', marginBottom: '5px', color: '#7f8c8d' }}>Role</label>
                        <select name="role" value={formData.role} onChange={handleChange} style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}>
                            <option value="patient">Patient</option>
                            <option value="admin">Admin</option>
                        </select>
                    </div>

                    <button type="submit" className="primary-btn" style={{ marginTop: '1rem' }}>REGISTER</button>
                </form>
                
                <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
                    <Link to="/" style={{ color: '#3498db', textDecoration: 'none' }}>← Back to Home</Link>
                </div>
            </div>
        </div>
    );
}
