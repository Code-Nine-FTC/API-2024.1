import api from "../../services/api";

const BuscarUltimoTicketSup = async () => {
    try {
        const resposta = await api.get('/ultimoChamadoSup');
        console.log(resposta.data.chamados)
        return resposta.data
    } catch (error) {
        throw new Error('Erro ao buscar o chamado Por favor, tente novamente mais tarde.');
    }
}

export default BuscarUltimoTicketSup