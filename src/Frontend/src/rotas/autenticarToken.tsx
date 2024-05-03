import { useState, useEffect } from 'react';
import axios from 'axios';
import { rotaBase } from '../functions/rotaBase';

const useAutenticarToken = (token: string) => {
    const [autenticado, setAutenticado] = useState(false);
    const [loading, setLoading] = useState(true); // Add loading state

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
                }
                else {
                    setAutenticado(false);
                }
            } catch (error: any) {
                console.error('Erro na verificação de Token')
            } finally {
                setLoading(false); // Set loading to false regardless of success or failure
            }
            
            if (!loading) { // Check loading state before making the request
                autenticarToken();
            }

        };
        autenticarToken();
    }, []);

    return { autenticado, loading };
};

export default useAutenticarToken;