import React, { useEffect, useState, ReactElement} from 'react';
import { Route, Navigate, RouteProps, useLocation } from 'react-router-dom';
import useAutenticarToken from './autenticarToken';

interface RotaProtegidaProps {
    children: any;
}

const RotaProtegida: React.FC<RotaProtegidaProps> = ({ children }) => {
    const location = useLocation();  
    const token = localStorage.getItem('token') || ''
    const [autenticado, setAutenticado] = useState(false);

    const autenticarToken = useAutenticarToken(token);

    useEffect(() => {
        autenticarToken.then(isAutenticado => {
            setAutenticado(isAutenticado || false);
        });
    }, [autenticarToken]);

    return autenticado ? children : <Navigate to="/login" replace state={{ from: location }} />;

    // useEffect(() => {
    //     const verificarAutenticacao = async () => {
    //         const isAutenticado = await useAutenticarToken(token)
    //         if (isAutenticado === undefined) {
    //             setAutenticado(false)
    //         }
    //         else {
    //             setAutenticado(isAutenticado)
    //         }
    //     }
    //     verificarAutenticacao()
    // }, [token]);

    // return autenticado ? children : <Navigate to="/login" replace state={{ from: location }} />;
}

export default RotaProtegida