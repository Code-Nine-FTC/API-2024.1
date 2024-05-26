import { rotaBase } from "../RotaBase/rotaBase"
import api from "../../services/api";

const EnviarMensagemFunc = async (mensagem: any) => {
    try {
        console.log(mensagem)
        const resultado = await api.post(`/enviarMensagem`, mensagem);
        return resultado.data
    }
    catch(error) {
        console.error('Erro ao enviar mensagem: ', error)
        throw new Error('Erro ao enviar a mensagem')
    }
};

export default EnviarMensagemFunc