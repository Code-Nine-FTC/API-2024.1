import api from "../../services/api";

// Busca usuario no banco banco de dados com base no id fornecido
const BuscarTodosTickets = async (user: string | null) => {
    switch (user) {
        case 'usuario':
            try {
                const resposta = await api.get('/todos/chamados/cliente');
                console.log(resposta.data.chamados)
                return resposta.data
            } catch (error) {
                throw new Error('Erro ao buscar o chamado Por favor, tente novamente mais tarde.');
            }
        case 'atendente':
            try {
                const resposta = await api.get('/todos/chamados/finalizados');
                console.log(resposta.data.chamados)
                return resposta.data
            } catch (error) {
                throw new Error('Erro ao buscar o chamado Por favor, tente novamente mais tarde.');
            }
        case 'administrador':
            try {
                const resposta = await api.get('/todos/chamados/administrador');
                return resposta.data
            } catch (error) {
                throw new Error('Erro ao buscar o chamado Por favor, tente novamente mais tarde.');
            }
        }
    };

export default BuscarTodosTickets