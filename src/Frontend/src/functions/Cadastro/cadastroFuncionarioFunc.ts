import api from "../../services/api";
import { AxiosError } from "axios";

const CadastroFuncionarioFunc = async (formData: any) => {
    try {
        const resultado = await api.post(`/cadastro/funcionario`, formData)
        
        if (!resultado.data.success) {
            throw new Error(resultado.data.message);
        }

        return resultado.data
    }
    catch (error) {
        let errorMessage = (error as AxiosError).response?.data as any;
        errorMessage = errorMessage?.message || 'Erro ao realizar o cadastro. Por favor, tente novamente mais tarde.';
        throw new Error(errorMessage);
    }
};

export default CadastroFuncionarioFunc;