import axios from "axios"
import { rotaBase } from "../RotaBase/rotaBase"
import { useEffect, useState } from "react"
import api from "../../services/api"

export default function BuscarNomeAtendente(id: number) {
    const [name, setName] = useState('')
    useEffect(() =>{
        const BuscaNome = async () =>{
            try {
                const resultado = await api.post(`/viewFuncionario`, id)
                if(resultado.data.func_name){
                    const nomeFunc = resultado.data.func_name
                    setName(nomeFunc)
                }
                // else{
                //     setName('')
                // }
            } catch (error) {
                console.error('Erro ao buscar nome de funcionario: ', error);
                throw new Error('Erro ao buscar nome de funcionario');
            } 
        }
        BuscaNome()
    }, [])

    return {name};
}