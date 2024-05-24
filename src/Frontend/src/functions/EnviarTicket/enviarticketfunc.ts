import api from "../../services/api";
import IdadosChamado from "./IChamado"

const EnviarTicket = async (dadosChamado: IdadosChamado ) => {
    try{
        const resultado = await api.post(`/cadastroChamado`, dadosChamado);
        console.log('Resultado do cadastroChamado: ', resultado.data)
        if (resultado.data.success) {
            return resultado.data
        } else {
            console.log('Falha ao criar chamado: ', resultado.data)
        }
    } catch(error) {
        console.error('Erro ao enviar Ticket: ', error)
        throw new Error('Erro ao enviar Ticket')
        }
    
};

export default EnviarTicket