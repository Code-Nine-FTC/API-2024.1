import api from "../../services/api"

const LoginClienteFunc = async(formData: any) => {
    console.log(formData)
    try {
        const resultado = await api.post(`/logginCliente`, formData)
        console.log(resultado.data.token)
        console.log(resultado.data.success)
        return {token: resultado.data.token, message: resultado.data.message, success: resultado.data.success, nivelAcesso: resultado.data.nivelAcesso}
    }
    catch (error) {
        console.error('Erro no login', error)
        throw new Error('Erro ao logar o cliente')
    }
}

export default LoginClienteFunc