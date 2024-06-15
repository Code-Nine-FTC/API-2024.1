 import api from "../../services/api";


export const listarChamadosPorCategoriaEStatus = async (cat_id: number) => {
    try {
        const resultado = await api.get(`/dashboard/pesquisa/chamado/status/${cat_id}`);
        return { success: resultado.data.success, chamadosPorStatus: resultado.data.data };
    } catch (error) {
        console.error('Erro ao listar chamados por categoria e status: ', error);
        return { success: false, message: 'Erro ao listar chamados por categoria e status.' };
    }
};

export const listarCategorias = async () => {
    try {
        const resultado = await api.get(`/todas/categorias`);
        return { success: resultado.data.success, categorias: resultado.data.categorias };
    } catch (error) {
        console.error('Erro ao listar categorias: ', error);
        return { success: false, message: 'Erro ao listar categorias.' };
    }
    
};
export const listarTodosChamadosPorCategoria = async () => {
    try {
        const resultado = await api.get(`/dashboard/pesquisa/todos-chamados`);
        return { success: resultado.data.success, data: resultado.data.data };
    } catch (error) {
        console.error('Erro ao listar todos os chamados por categoria: ', error);
        return { success: false, message: 'Erro ao listar todos os chamados por categoria.' };
    }
};
