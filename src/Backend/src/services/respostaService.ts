import { IRespostaInput } from "../interfaces/IRespostas";
import Resposta from "../entities/resposta";
import { Connection } from "../config/data-source";
import Chamado from "../entities/chamado";



export default class RespostaService {
    public async enviarMensagem(dadosMensagem: IRespostaInput) {
        try{
            console.log('Recebendo dados no mensagemService')
            console.log(dadosMensagem)
            const respostaRepository = Connection.getRepository(Resposta)
            const novaMensagem = respostaRepository.create(dadosMensagem)
            console.log(novaMensagem)
            await respostaRepository.save(novaMensagem)
            console.log('Mensagem enviada')
            return { success: true}
        }
        catch(error) {
            console.error('Erro ao enviar mensagem', error)
            return { success: false}
        }
    }
    public async buscarChamado(id: number){
        try{
            console.log('Recebendo dados')
            console.log(id)
            const respostaRepository = Connection.getRepository(Chamado)
            const chamado = await respostaRepository.findOne({ where: { cha_id: id } })
            // console.log(chamado)
            console.log('Result of buscarChamado:', chamado);
            if (!chamado) {
                return { success: false, message: `Chamado não encontrado` }
            }
            return { success: true, message: `Chamado encontrado`, chamado }
            } 
            catch (error) {
            console.error('Error in buscarChamado:', error);
            // console.error(`Erro ao encontrar chamado: ${error}`)
            return { success: false, message: `Erro ao encontrar o chamado` }
        }
    }

    public async buscarMensagens(id: number){
        try{
            console.log('Recebendo mensagens')
            console.log(id)
            const respostaRepository = Connection.getRepository(Resposta)
            const respostas = await respostaRepository.find({
                where: {
                    chamado: { cha_id: id } 
                },
                relations: ['chamado']
            });
            console.log(respostas)
            // if(!respostas){
            //     return{success: false, message: `Mensagem não encontrada`}
            // }
            return {success: true, message: `Mensagem encontrada`, respostas}
        }
        catch(error) {
            console.error(`Erro ao encontrar mensagem: ${error}`)
            return {success: false, message: `Erro ao encontrar o chamado`}
        }
    }
}