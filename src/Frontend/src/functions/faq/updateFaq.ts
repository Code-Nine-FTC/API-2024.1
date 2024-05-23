import api from "../../services/api";
import { IFaqUpdate } from "../../../../Backend/src/interfaces/IFaq";

const updateFaq = async (faq_id: number, dadosUpdate: IFaqUpdate) => {
    try {
        const resultado = await api.put(`/editarFaq/${faq_id}`, dadosUpdate);
        return { updateFaq: resultado.data.updateFaq, message: resultado.data.message, success: resultado.data.success };
    } catch (error) {
        console.error('Erro ao editar FAQ: ', error);
        throw new Error('Erro ao salvar');
    }
};

export default updateFaq;
