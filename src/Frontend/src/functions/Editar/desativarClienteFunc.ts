import api from "../../services/api";

export default async function desativarCliente() {
    try {
        const resultado = await api.put(`/desativar/cliente`);
        console.log(resultado.data.success, resultado.data.message)
        return { success: resultado.data.success, message: resultado.data.message };
    } catch (error) {
        console.error('Erro ao desativar conta: ', error);
        throw new Error('Erro ao desativar conta');
    }
}