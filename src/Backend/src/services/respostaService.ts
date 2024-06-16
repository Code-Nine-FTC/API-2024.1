import { IRespostaInput } from "../interfaces/IRespostas";
import Resposta from "../entities/resposta";
import { Connection } from "../config/data-source";
import Chamado from "../entities/chamado";
import Cliente from "../entities/cliente";
import Funcionario from "../entities/funcionario";
import Categoria from "../entities/categoria";



export default class RespostaService {
    private respostaRepository = Connection.getRepository(Resposta)
    private chamadoRepository = Connection.getRepository(Chamado)

    public async enviarMensagem(dadosMensagem: IRespostaInput) {
        try{
            const novaMensagem = await this.respostaRepository.create(dadosMensagem)
            await this.respostaRepository.save(novaMensagem)
            return { success: true}
        }
        catch(error) {
            console.error('Erro ao enviar mensagem', error)
            return { success: false}
        }
    }
    
    public async buscarChamado(id: number){
        try{
            const chamado = await this.chamadoRepository.createQueryBuilder("chamado")
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

            if (!chamado) {
                return { success: false, message: `Chamado não encontrado` }
            }
            return { success: true, message: `Chamado encontrado`, chamado }
            } 
            catch (error) {
            console.error('Error in buscarChamado:', error);
            return { success: false, message: `Erro ao encontrar o chamado` }
        }
    }

    public async buscarMensagens(id: number){
        try{
            const respostas = await this.respostaRepository.find({
                where: {
                    chamado: { cha_id: id } 
                },
                relations: ['chamado']
            });
            return {success: true, message: `Mensagem encontrada`, respostas}
        }
        catch(error) {
            console.error(`Erro ao encontrar mensagem: ${error}`)
            return {success: false, message: `Erro ao encontrar o chamado`}
        }
    }
}