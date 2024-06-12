import api from "../../services/api";
import { AxiosError } from "axios";

const IniciarTicket = async (id: number | null) => {
    try {
        // envia o id 
        const resposta = await api.post(`/iniciarChamado/${id}`);
        console.log(resposta.data.chamados)

        if (!resposta.data.success) {
            throw new Error(resposta.data.message);
        }

        return resposta.data
    } catch (error) {
        let errorMessage = (error as AxiosError).response?.data as any;
        errorMessage = errorMessage?.message || 'Erro ao inciar o chamado. Por favor, tente novamente mais tarde.';
        throw new Error(errorMessage);
    }
}

export default IniciarTicket