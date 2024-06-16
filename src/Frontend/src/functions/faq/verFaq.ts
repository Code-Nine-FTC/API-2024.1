import api from "../../services/api";

const verFaq = async (faq_id: number) => {
    try {
        const resultado = await api.get(`/ver/faq/${faq_id}`);
        return resultado.data;
    } catch (error) {
        console.error('Erro ao deletar FAQs: ', error);
        return { success: false, message: 'Erro ao deletar FAQs.' };
    }
};

export default verFaq;