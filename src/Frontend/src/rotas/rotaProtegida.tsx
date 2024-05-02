import React, { useEffect, useState, ReactElement} from 'react';
import { Route, Navigate, RouteProps } from 'react-router-dom';
import AutenticarToken from './autenticarToken';

interface RotaProtegidaProps {
    element: ReactElement;
    routeProps: RouteProps;
}

const RotaProtegida: React.FC<RotaProtegidaProps> = ({ element, ...rest }) => {
    const [carregando, setCarregando] = useState(true);
    const [autenticado, setAutenticado] = useState(false);
    const [token, setToken] = useState('');

    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        setToken(storedToken || '');
    }, []);
    
    useEffect(() => {
        const verificarAutenticacao = async () => {
            const isAutenticado = await AutenticarToken(token)
            if (isAutenticado === undefined) {
                setAutenticado(false)
            }
            else {
                setAutenticado(isAutenticado)
            }
            setCarregando(false);
        }
        verificarAutenticacao()
    }, [token]);

    if (carregando) {
        return null; 
    }
    return autenticado ? <Route {...rest} element={element}/> : <Navigate to={'/login'}/>;
}

export default RotaProtegida