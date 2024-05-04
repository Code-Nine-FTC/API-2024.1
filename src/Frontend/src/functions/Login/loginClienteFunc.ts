import {rotaBase} from "../RotaBase/rotaBase"
import axios from "axios"

const LoginClienteFunc = async(formData: any) => {
    console.log(formData)
    try {
        const resultado = await axios.post(`${rotaBase}/logginCliente`, formData)
        return resultado.data
    }
    catch (error) {
        console.error('Erro no login', error)
        throw new Error('Erro ao logar o cliente')
    }
}

export default LoginClienteFunc