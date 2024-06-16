import api from "../../services/api";

const BuscarUltimoTicketCliente = async () => {
    try {
        const resposta = await api.get('/ultimo/chamado/cliente');
        console.log(resposta.data.chamados)
        return resposta.data
    } catch (error) {
        throw new Error('Erro ao buscar o chamado Por favor, tente novamente mais tarde.');
    }
}

export default BuscarUltimoTicketCliente