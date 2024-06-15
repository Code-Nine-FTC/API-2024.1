 import { log } from "console";
import api from "../../services/api";


export const listarChamadosPorCategoriaEStatus = async (cat_id: number, dataInicial: string, dataFinal: string) => {
    console.log('Datas: ', dataInicial, dataFinal)
    try {
        const resultado = await api.post(`/dashboard/pesquisa/chamado/status/${cat_id}`, {dataInicial, dataFinal
        });
        console.log(resultado.data.data)
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
export const listarTodosChamadosPorCategoria = async (dataInicial:string, dataFinal: string) => {
    try {
        const resultado = await api.post(`/dashboard/pesquisa/todos-chamados`, {dataInicial, dataFinal
        });
        return { success: resultado.data.success, data: resultado.data.data };
    } catch (error) {
        console.error('Erro ao listar todos os chamados por categoria: ', error);
        return { success: false, message: 'Erro ao listar todos os chamados por categoria.' };
    }
};
