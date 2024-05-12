import axios from "axios"
import { rotaBase } from "../RotaBase/rotaBase"
import { useState, useEffect } from "react"
import api from "../../services/api"

export default async function BuscarNomeCliente(id: number){
            try {
                const resultado = await api.post(`/verCliente`, id)
                return {name: resultado.data.cliente.cli_nome};
            } catch (error) {
                console.error('Erro ao buscar nome de cliente: ', error);
                throw new Error('Erro ao buscar nome de cliente');
            } 
            
        }

    
