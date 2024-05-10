import { useState, useEffect } from "react"
import axios from "axios"
import { rotaBase } from "../RotaBase/rotaBase";
import IChamadoView from "./IChamado";


export default function BuscarChamado(id: number, token: string | null) {
    const [chamado, setChamado] = useState<IChamadoView[]>([]);
    useEffect(() => {
        const fetchChamado = async () => {
          try {
            const resultado = await axios.post(`${rotaBase}/buscarChamado`, id, {
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
    return chamado
}