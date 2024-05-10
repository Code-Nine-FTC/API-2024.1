import { useState, useEffect } from "react"
import axios from "axios"
import { rotaBase } from "../RotaBase/rotaBase";
import IChamadoView from "./IChamado";
import api from "../../services/api";


export default function BuscarChamado(id: number) {
    const [chamado, setChamado] = useState<any>(null);
    useEffect(() => {
        const fetchChamado = async () => {
          try {
            const resultado = await api.post(`/buscarChamado`, id)
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