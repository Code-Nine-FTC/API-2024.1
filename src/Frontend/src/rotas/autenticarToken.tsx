import React, { useEffect, useState } from 'react';
import { Route, Navigate } from 'react-router-dom';
import axios from 'axios';
import { rotaBase } from '../functions/rotaBase';

const useAutenticarToken = async (token: string) => {
    // const [previousToken, setPreviousToken] = useState<string | null> (null);
    const [autenticado, setAutenticado] = useState(false);
    useEffect(() => {
        const autenticarToken = async () => {
            try {
                console.log('Tentando autenticar')
                const resultado = await axios.post(`${rotaBase}/autenticarfrontpage`, {}, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                if (resultado.data.success) {
                    console.log(resultado.data)
                    const iduser= resultado.data.id
                    const leveluser = resultado.data.nivelAcesso
                    localStorage.setItem('id', iduser)
                    localStorage.setItem('nivel', leveluser)
                    setAutenticado(true);
                    return autenticado
                }
                else {
                    setAutenticado(false);
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