import { IResposta } from "../interfaces/IRespostas";
import Resposta from "../entities/resposta";
import { Connection } from "../config/data-source";

export default class RespostaService {
    public async enviarMensagem(dadosMensagem: IResposta) {
        try{
            console.log('Recebendo dados no mensagemService')
            console.log(dadosMensagem)
            const respostaRepository = Connection.getRepository(Resposta)
            const novaMensagem = respostaRepository.create(dadosMensagem)
            await respostaRepository.save(novaMensagem)
            console.log('Mensagem enviada')
            return { success: true}
        }
        catch(error) {
            console.error('Erro ao enviar mensagem', error)
            return { success: false}
        }
    }
}