import api from "../../services/api"
import { AxiosError } from "axios"

const LoginClienteFunc = async(formData: any) => {
    console.log(formData)
    try {
        const resultado = await api.post(`/logginCliente`, formData)
        if (!resultado.data.success) {
            throw new Error(resultado.data.message);
        }

        return {token: resultado.data.token, message: resultado.data.message, success: resultado.data.success, nivelAcesso: resultado.data.nivelAcesso}
    }
    catch (error) {
        let errorMessage = (error as AxiosError).response?.data as any;
        errorMessage = errorMessage?.message || 'Erro ao inciar o chamado. Por favor, tente novamente mais tarde.';
        throw new Error(errorMessage);
    }
}

export default LoginClienteFunc