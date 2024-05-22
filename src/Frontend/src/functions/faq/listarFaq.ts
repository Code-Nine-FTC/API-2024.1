import api from "../../services/api";

const ListarFaqs = async () => {
    try {
        const resultado = await api.get(`/listarFaqs`);
        return { success: resultado.data.success, faqs: resultado.data.faqs };
    } catch (error) {
        console.error('Erro ao listar FAQs: ', error);
        return { success: false, message: 'Erro ao listar FAQs.' };
    }
};

export default ListarFaqs;
