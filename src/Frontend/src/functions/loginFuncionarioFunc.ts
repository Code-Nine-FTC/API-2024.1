import {rotaBase} from "./rotaBase"
import axios from "axios"

const LoginFuncionarioFunc = async(formData: any) => {
    console.log(formData)
    try {
        const resultado = await axios.post(`${rotaBase}/logginFuncionario`, formData)
        return resultado.data
    }
    catch (error) {
        console.error('Erro no login', error)
        throw new Error('Erro ao logar o atendente')
    }
}

export default LoginFuncionarioFunc