import axios from "axios"
import { rotaBase } from "../RotaBase/rotaBase"
import { useState, useEffect } from "react"
import api from "../../services/api"

export default function BuscarNomeCliente(id: number){
    const [name, setName] = useState('')
    useEffect(() =>{
        const BuscaNome = async () =>{
            try {
                const resultado = await api.post(`/verCliente`, id)
                if(resultado.data.cli_name){
                    const nomeFunc = resultado.data.cli_name
                    setName(nomeFunc)
                }
                // else{
                //     setName('')
                // }
            } catch (error) {
                console.error('Erro ao buscar nome de cliente: ', error);
                throw new Error('Erro ao buscar nome de cliente');
            } 
        }
        BuscaNome()
    }, [])

    return {name};
}