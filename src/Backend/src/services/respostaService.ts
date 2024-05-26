import { IRespostaInput } from "../interfaces/IRespostas";
import Resposta from "../entities/resposta";
import { Connection } from "../config/data-source";
import Chamado from "../entities/chamado";
import Cliente from "../entities/cliente";
import Funcionario from "../entities/funcionario";
import Categoria from "../entities/categoria";



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
            const chamadoRepository = Connection.getRepository(Chamado)
            const chamado = await chamadoRepository.createQueryBuilder("chamado")
            .leftJoin("chamado.cliente", "cliente")
            .addSelect(["cliente.cli_id", "cliente.cli_nome"])
            .leftJoin("chamado.funcionario", "funcionario")
            .addSelect(["funcionario.func_id", "funcionario.func_nome"])
            .leftJoin("chamado.respostas", "respostas")
            .addSelect("respostas.resp_id")
            .leftJoinAndSelect("chamado.categoria", "categoria")
            .addSelect("categoria.cat_titulo")
            .where("chamado.cha_id = :id", { id: id })
            .getOne();
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