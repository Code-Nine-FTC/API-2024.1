import api from "../../services/api";

interface IFaqInput {
    faq_exemplo: string;
    faq_titulo: string;
    faq_descricao: string;
}

interface ApiResponse {
    success: boolean;
    message: string;
    faq?: any;  
}

const CadastroFaqAdm = async (formData: IFaqInput): Promise<ApiResponse> => {
    try {
        const resultado = await api.post('/criar/faq', formData);
        return { success: resultado.data.success, message: resultado.data.message, faq: resultado.data.faq };
    } catch (error: any) {
        console.error('Erro no cadastro de FAQ: ', error);
        return { success: false, message: 'Erro no cadastro de FAQ' };
    }
};

export default CadastroFaqAdm;
