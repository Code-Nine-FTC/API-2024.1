import api from "../../services/api";

const deletarFaq = async (faq_id: number) => {
    try {
        const resultado = await api.delete(`/deletar/faq/${faq_id}`);
        return resultado.data;
    } catch (error) {
        console.error('Erro ao deletar FAQs: ', error);
        return { success: false, message: 'Erro ao deletar FAQs.' };
    }
};

export default deletarFaq;
