import api from "../../services/api"
import {rotaBase} from "../RotaBase/rotaBase"
import axios from "axios"

const LoginFuncionarioFunc = async(formData: any) => {
    console.log(formData)
    try {
        const resultado = await api.post(`/logginFuncionario`, formData)
        return {token: resultado.data.token, nivelAcesso: resultado.data.nivelAcesso, success: resultado.data.success, message: resultado.data.message}
    }
    catch (error) {
        console.error('Erro no login', error)
        throw new Error('Erro ao logar o atendente')
    }
}

export default LoginFuncionarioFunc