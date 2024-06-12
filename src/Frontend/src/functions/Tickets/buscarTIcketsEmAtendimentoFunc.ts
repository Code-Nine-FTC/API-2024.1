import api from "../../services/api";

// Busca usuario no banco banco de dados com base no id fornecido
const BuscarTicketsEmAtendimento = async (user: string | null) => {
    switch (user) {
        case 'usuario':
            try {
                // envia o id 
                const resposta = await api.get('/chamados/ativos/cliente');
                return {success: resposta.data.success, message: resposta.data.message, chamados: resposta.data.chamados}
            } catch (error) {
                throw new Error('Erro ao buscar o chamado. Por favor, tente novamente mais tarde.');
            }
        case 'atendente':
            try {
                const resposta = await api.get('/chamado/em/atendimento/funcionario');
                console.log(resposta.data.chamados)
                return resposta.data
            } catch (error) {
                throw new Error('Erro ao buscar o chamado. Por favor, tente novamente mais tarde.');
            }
        case 'administrador':
            try {
                const resposta = await api.get('/todos/chamados/em/atendimento');
                return resposta.data
            } catch (error) {
                throw new Error('Erro ao buscar todos os chamados. Por favor, tente novamente mais tarde.');
            }
        }
    };

export default BuscarTicketsEmAtendimento