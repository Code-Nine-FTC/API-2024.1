import axios from "axios"
import { rotaBase } from "../RotaBase/rotaBase"
import { useEffect, useState } from "react"

export default function BuscarNomeAtendente(id: number, token: string | null) {
    const [name, setName] = useState('')
    useEffect(() =>{
        const BuscaNome = async () =>{
            try {
                const resultado = await axios.post(`${rotaBase}/viewFuncionario`, id, {
                    headers: {
                        Authorization: `Bearer ${token}`
                      }
                })
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