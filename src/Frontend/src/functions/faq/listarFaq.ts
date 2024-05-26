import api from "../../services/api";

const ListarFaqs = async () => {
    try {
        const resultado = await api.get(`/listarFaqs`);
        return resultado.data;
    } catch (error) {
        console.error('Erro ao listar FAQs: ', error);
        return { success: false, message: 'Erro ao listar FAQs.' };
    }
};

export default ListarFaqs;
