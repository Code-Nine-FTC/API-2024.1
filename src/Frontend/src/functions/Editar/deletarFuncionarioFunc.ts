import api from "../../services/api";

export default async function deletarFuncionario(func_id: number) {
    try {
        const resultado = await api.post(`/desativarFuncionario`, {  func_id  });
        console.log(resultado.data.success, resultado.data.message)
        return { success: resultado.data.success, message: resultado.data.message };
    } catch (error) {
        console.error('Erro ao deletar funcionário: ', error);
        throw new Error('Erro ao deletar funcionário');
    }
}