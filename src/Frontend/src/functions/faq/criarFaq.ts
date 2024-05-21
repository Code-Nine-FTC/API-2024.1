import api from "../../services/api";

interface IFaqInput {
    faq_exemplo: string
    faq_titulo: string
    faq_descricao: string
}

const CadastroFaqAdm = async (formData: IFaqInput) => {
    try {
        const resultado = await api.post(`/criarFaq`, formData);
        return { success: resultado.data.success, message: resultado.data.message, faq: resultado.data.faq };
    } catch (error) {
        console.error('Erro no cadastro de FAQ: ', error);
    }
};

export default CadastroFaqAdm;


