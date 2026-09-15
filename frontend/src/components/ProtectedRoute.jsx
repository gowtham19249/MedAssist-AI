import React from 'react';
import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ children }) {
    const token = localStorage.getItem('token');
    
    // If there is no token in the browser, forcefully kick them to the login page
    if (!token) {
        return <Navigate to="/login" replace />;
    }
    
    // If the token exists, allow them to view the protected page
    return children;
}
