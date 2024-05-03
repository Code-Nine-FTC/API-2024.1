import React, { useEffect, useState, ReactElement} from 'react';
import { Route, Navigate, RouteProps, useLocation } from 'react-router-dom';
import useAutenticarToken from './autenticarToken';

interface RotaProtegidaProps {
    children: any;
}

const RotaProtegida: React.FC<RotaProtegidaProps> = ({ children }) => {
    const location = useLocation();  
    const token = localStorage.getItem('token') || ''

    const verificarAutenticacao = async () => {
        const autenticado = await useAutenticarToken(token)
        return autenticado
    };

    useEffect(() => {
        verificarAutenticacao().then((autenticado) => {
            if(!autenticado) {
                <Navigate to="/login" replace state={{ from: location }} />
                console.log('Usuario não autenticado')
            }
        });
    }, [token])
    
    // useEffect(() => {
    //     autenticarToken.then(isAutenticado => {
    //         setAutenticado(isAutenticado || false);
    //     });
    // }, []);

    return children 

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