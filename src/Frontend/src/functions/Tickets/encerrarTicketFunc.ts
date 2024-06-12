import api from "../../services/api";
import { AxiosError } from "axios";

const EncerrarTicket = async (id: number | null) => {
    try {
        // envia o id 
        const resposta = await api.put(`/finaliza/atendimento/${id}`);
        console.log(resposta.data)

        if (!resposta.data.success) {
            throw new Error(resposta.data.message);
        }

        return resposta.data
    } catch (error) {
        let errorMessage = (error as AxiosError).response?.data as any;
        errorMessage = errorMessage?.message || 'Erro ao encerrar o chamado. Por favor, tente novamente mais tarde.';
        throw new Error(errorMessage);
    }
}

export default EncerrarTicket;
