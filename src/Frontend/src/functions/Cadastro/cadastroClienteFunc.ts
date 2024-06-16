import { AxiosError } from "axios";
import api from "../../services/api";

const CadastroClienteFunc = async (formData: any) => {
    console.log(formData)
    try {
        const resultado = await api.post(`/cadastro/cliente`, formData)
        if (!resultado.data.success) {
            throw new Error(resultado.data.message);
        }
        return resultado.data;
    }
    catch (error) {
        let errorMessage = (error as AxiosError).response?.data as any;
        errorMessage = errorMessage?.message || 'Erro ao realizar o cadastro. Por favor, tente novamente mais tarde.';
        throw new Error(errorMessage);
    }
};

export default CadastroClienteFunc