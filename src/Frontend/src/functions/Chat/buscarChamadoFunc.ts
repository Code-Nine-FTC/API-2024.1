import { useState, useEffect } from "react"
import axios from "axios"
import { rotaBase } from "../RotaBase/rotaBase";

export default function BuscarChamado(id: number, token: string | null) {
    const [chamado, setChamado] = useState([]);
    useEffect(() => {
        const fetchChamado = async () => {
          try {
            const resultado = await axios.post(`${rotaBase}/viewFuncionario`, id, {
                headers: {
                    Authorization: `Bearer ${token}`
                  }
            })
          ;
            setChamado(resultado.data.chamado);
          } catch (error) {
            console.error('Erro ao buscar nome de funcionario: ', error);
            throw new Error('Erro ao buscar nome de funcionario');
        }
        };
    
        fetchChamado();
      }, []);
    
}