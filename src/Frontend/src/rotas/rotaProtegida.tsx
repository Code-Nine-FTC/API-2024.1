import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import useAutenticarToken from './autenticarToken';

interface RotaProtegidaProps {
    children: React.ReactNode;
}

const RotaProtegida: React.FC<RotaProtegidaProps> = ({ children }) => {
    const location = useLocation();  
    const token = localStorage.getItem('token') || '';
    const { autenticado, loading } = useAutenticarToken(token);

    if (loading) {
        return <div>Loading...</div>; // You can render a loading indicator here
    }

    if (!autenticado) {
        return <Navigate to="/login" replace state={{ from: location }} />;
    }

    return <>{children}</>;
};

export default RotaProtegida;