import api from "../../services/api";
import { AxiosError } from "axios";

const AtribuirChamado = async (func_id: number | null, cha_id: number | null) => {
    const dadosChamado = {
        func_id: func_id,
        cha_id: cha_id
    }
    try {
        const resposta = await api.post(`/direcionaAtendimento`, dadosChamado) ;
        if (!resposta.data.success) {
            throw new Error(resposta.data.message);
        }
        return resposta.data
    } catch (error) {
        let errorMessage = (error as AxiosError).response?.data as any;
        errorMessage = errorMessage?.message || 'Erro ao atribuir o chamado. Por favor, tente novamente mais tarde.';
        throw new Error(errorMessage);
    }
}

export default AtribuirChamado