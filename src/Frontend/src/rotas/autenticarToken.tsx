import React, { useEffect, useState } from 'react';
import { Route, Navigate } from 'react-router-dom';
import axios from 'axios';
import { rotaBase } from '../functions/rotaBase';

const useAutenticarToken = async (token: string) => {
    const [autenticado, setAutenticado] = useState(false);
    const [sessionId, setSessionId] = useState('');
    const [sessionNivel, setSessionNivel] = useState('');

    useEffect(() => {
        const autenticarToken = async () => {
            try {
                const resultado = await axios.post(`${rotaBase}/autenticarfrontpage`, token)
                if (resultado.data.success) {
                    const iduser= resultado.data.id
                    const leveluser = resultado.data.nivelAcesso
                    setSessionId(iduser)
                    setSessionNivel(leveluser)
                    setAutenticado(true);
                    localStorage.setItem('id', sessionId)
                    localStorage.setItem('nivel', sessionNivel)
                    return autenticado
                }
                else {
                    setAutenticado(false);
                    return autenticado
                }
            } catch (error: any) {
                // setErro(error.message);
                console.error('Erro na verificação de Token')
              }
        };

        autenticarToken();
    }, [token]);

    return autenticado

};

export default useAutenticarToken