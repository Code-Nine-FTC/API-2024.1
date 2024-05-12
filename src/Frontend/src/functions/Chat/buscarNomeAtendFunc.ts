import axios from "axios"
import { rotaBase } from "../RotaBase/rotaBase"
import { useEffect, useState } from "react"
import api from "../../services/api"

export default async function BuscarNomeAtendente(id: number) {
            try {
                const resultado = await api.post(`/chatFuncionario`, id)
                return {name: resultado.data.funcionario.func_nome}
            } catch (error) {
                console.error('Erro ao buscar nome de funcionario: ', error);
                throw new Error('Erro ao buscar nome de funcionario');
            } 
        }

    