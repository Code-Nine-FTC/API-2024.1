import api from "../../services/api";

const EnviarMensagemFunc = async (mensagem: any) => {
    try {
        const resultado = await api.post(`/enviar/mensagem`, mensagem);
        return resultado.data
    }
    catch(error) {
        console.error('Erro ao enviar mensagem: ', error)
        throw new Error('Erro ao enviar a mensagem')
    }
};

export default EnviarMensagemFunc