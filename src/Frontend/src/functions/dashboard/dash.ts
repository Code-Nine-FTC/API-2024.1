 import api from "../../services/api";


export const listarChamadosPorCategoriaEStatus = async (cat_id: number) => {
    try {
        const resultado = await api.get(`/chamados-por-categoria-e-status/${cat_id}`);
        return { success: resultado.data.success, chamadosPorStatus: resultado.data.chamadosPorStatus };
    } catch (error) {
        console.error('Erro ao listar chamados por categoria e status: ', error);
        return { success: false, message: 'Erro ao listar chamados por categoria e status.' };
    }
};

export const listarCategorias = async () => {
    try {
        const resultado = await api.get(`/listarCategorias`);
        return { success: resultado.data.success, categorias: resultado.data.categorias };
    } catch (error) {
        console.error('Erro ao listar categorias: ', error);
        return { success: false, message: 'Erro ao listar categorias.' };
    }
};
