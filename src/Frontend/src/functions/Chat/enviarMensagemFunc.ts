import { rotaBase } from "../RotaBase/rotaBase"
import axios from "axios"

const EnviarMensagemFunc = async (mensagem: any) => {
    const token = localStorage.getItem('token')
    try {
        console.log(mensagem)
        const resultado = await axios.post(`${rotaBase}/enviarMensagem`, mensagem, {
            headers: {
                Authorization: `Bearer ${token}`
              }
        });
        return resultado.data
    }
    catch(error) {
        console.error('Erro ao enviar mensagem: ', error)
        throw new Error('Erro ao enviar a mensagem')
    }
};

export default EnviarMensagemFunc