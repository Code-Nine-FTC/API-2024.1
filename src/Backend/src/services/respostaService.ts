import { IRespostaInput } from "../interfaces/IRespostas";
import Resposta from "../entities/resposta";
import { Connection } from "../config/data-source";

// private recebeData(data: string): Date {
//     let partesData = data.split("/");
//     let ano = new Number(partesData[2].valueOf()).valueOf();
//     let mes = new Number(partesData[1].valueOf()).valueOf();
//     let dia = new Number(partesData[0].valueOf()).valueOf();
//     return new Date(ano, mes, dia);
//   }

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
}