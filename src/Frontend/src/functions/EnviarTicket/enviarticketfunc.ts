import api from "../../services/api";
import IdadosChamado from "./IChamado"

const EnviarTicket = async (dadosChamado: IdadosChamado ) => {
    try{
        const resultado = await api.post(`/novo/chamado`, dadosChamado);
        if (resultado.data.success) {
            return resultado.data
        }
    } catch(error) {
        console.error('Erro ao enviar Ticket: ', error)
        throw new Error('Erro ao enviar Ticket')
        }
    
};

export default EnviarTicket