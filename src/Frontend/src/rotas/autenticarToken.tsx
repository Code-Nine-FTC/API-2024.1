import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { rotaBase } from '../functions/rotaBase';

const useAutenticarToken = (token: string) => {
    const [autenticado, setAutenticado] = useState(false);
    const [loading, setLoading] = useState(true);
    const debounceTimeoutRef = useRef<number | NodeJS.Timeout | null>(null); // Adjust the type of useRef

    useEffect(() => {
        const autenticarToken = async () => {
            try {
                console.log('Tentando autenticar');
                const resultado = await axios.post(`${rotaBase}/autenticarfrontpage`, {}, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                if (resultado.data.success) {
                    console.log(resultado.data);
                    const iduser = resultado.data.id;
                    const leveluser = resultado.data.nivelAcesso;
                    localStorage.setItem('id', iduser);
                    localStorage.setItem('nivel', leveluser);
                    setAutenticado(true);
                } else {
                    setAutenticado(false);
                }
            } catch (error: any) {
                console.error('Erro na verificação de Token');
            } finally {
                setLoading(false);
            }
        };

        const autenticarTokenDebounced = () => {
            if (debounceTimeoutRef.current) {
                clearTimeout(debounceTimeoutRef.current as NodeJS.Timeout); // Cast to NodeJS.Timeout
            }
            debounceTimeoutRef.current = setTimeout(() => {
                autenticarToken();
            }, 300);
        };

        autenticarTokenDebounced();

        return () => {
            if (debounceTimeoutRef.current) {
                clearTimeout(debounceTimeoutRef.current as NodeJS.Timeout); // Cast to NodeJS.Timeout
            }
        };
    }, [token]);

    return { autenticado, loading };
};

export default useAutenticarToken;
