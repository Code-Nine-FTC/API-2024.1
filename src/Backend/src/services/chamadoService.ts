import { Connection } from "../config/data-source";
import Categoria from "../entities/categoria";
import Chamado from "../entities/chamado";
import { IChamadoInput } from "../interfaces/IChamado";

class ChamadoService{
    private chamadoRepository = Connection.getRepository(Chamado)

    //Para Cliente
    public async cadastrarChamado(dadosChamado: IChamadoInput){
        console.log(dadosChamado)
        try{
            const categoriaRepository = await Connection.getRepository(Categoria)
            const categoria = await categoriaRepository.findOne({where: {cat_id: dadosChamado.cat_id}})

            dadosChamado.cha_prioridade = categoria.cat_prioridade
            
            // Cria o novo chamado
            const novoChamado = await this.chamadoRepository.create({
                cha_titulo: dadosChamado.cha_titulo,
                cha_descricao: dadosChamado.cha_descricao,
                cha_prioridade: categoria.cat_prioridade,
                cliente: { cli_id: dadosChamado.cli_id }, // 'cliente' é uma relação na entidade Chamado
                categoria: { cat_id: dadosChamado.cat_id } // 'categoria' é uma relação na entidade Chamado
            });
            // Salva novo chamado
            await this.chamadoRepository.save(novoChamado)

            return { success: true, message: `Chamado criado com sucesso!` }
        }catch(error){
            console.error(`Erro ao cadastrar chamado: ${error}`)
            return { success: false, message: `Erro ao cadastrar chamado.` }
        }
    }

    public async visualizarChamadosAtivosCliente(cli_id: number){
        try{
            // Busca os chamados do cliente desejado
            const chamadosCliente = await this.chamadoRepository.find({ 
                where: {
                    cliente: { cli_id: cli_id } ,// usa o relacionamento do cliente para a busca
                    cha_status: 'Aberto' || 'Em andamento'
                }
            })
            // verificações
            if (!chamadosCliente || chamadosCliente.length === 0){
                return { success: false, message: `Nenhum chamado encontrado!`}
            }
            return { success: true, message: `Chamados encontrados!`, chamados: chamadosCliente  }
        }catch(error){
            console.error(`Erro em buscar todos os chamados ativos do cliente: ${error}`)
            return { success: false, message: `Erro em buscar todos os chamados` }
        }
    }
    
    public async visualizarChamadosFinalizadosCliente(cli_id: number){
        try{
            // Busca os chamados do cliente desejado
            const chamadosCliente = await this.chamadoRepository.find({ 
                where: {
                    cliente: { cli_id: cli_id } ,// usa o relacionamento do cliente para a busca
                    cha_status: 'Concluído'
                }
            })
            // verificações
            if (!chamadosCliente || chamadosCliente.length === 0){
                return { success: false, message: `Nenhum chamado encontrado!`}
            }
            return { success: true, message: `Chamados encontrados!`, chamados: chamadosCliente  }
        }catch(error){
            console.error(`Erro em buscar todos os chamados do cliente: ${error}`)
            return { success: false, message: `Erro em buscar todos os chamados` }
        }
    }

    public async visualizarTodosChamadosCliente(cli_id: number){
        try{
            // Busca os chamados do cliente desejado
            const chamadosCliente = await this.chamadoRepository.find({ 
                where: {
                    cliente: { cli_id: cli_id } ,// usa o relacionamento do cliente para a busca
                }
            })
            // verificações
            if (!chamadosCliente || chamadosCliente.length === 0){
                return { success: false, message: `Nenhum chamado encontrado!`}
            }
            return { success: true, message: `Chamados encontrados!`, chamados: chamadosCliente  }
        }catch(error){
            console.error(`Erro em buscar todos os chamados do cliente: ${error}`)
            return { success: false, message: `Erro em buscar todos os chamados` }
        }
    }
    
    public async visualizarUltimoChamadoCliente(cli_id: number){
        try{
            // Busca os chamados do cliente desejado
            const chamadoCliente = await this.chamadoRepository.findOne({ 
                where: {
                    cliente: { cli_id: cli_id }// usa o relacionamento do cliente para a busca
                }, order: {
                    cha_data_inicio: 'DESC' // ordenando do mais recente para o mais antigo
                }
            })
            // verificação
            if (!chamadoCliente){
                return { success: false, message: `Nenhum chamado encontrado!`}
            }
            return { success: true, message: `Chamados encontrados!`, chamado: chamadoCliente  }
        }catch(error){
            console.error(`Erro em buscar todos os chamados do cliente: ${error}`)
            return { success: false, message: `Erro em buscar todos os chamados` }
        }
    }

    // Para Atendente
    public async visualizarChamadoEmAtendimentoAtendente(func_id: number){
        try{
            //Busca todos os chamados do atendente desejado
            const chamadoAtendente = await this.chamadoRepository.findOne({
                where: {
                    funcionario: { func_id: func_id },
                    cha_status: 'Em Andamento'
                }
            })
            // Verificações
            if(!chamadoAtendente){
                return { success: false, message: `Nenhum chamado encontrado!`}
            }
            return { success: true, message: `Chamados encontrados!`, chamado: chamadoAtendente }
        }catch(error){
            console.error(`Erro em buscar todos os chamados do atendente: ${error}`)
            return { success: false, message: `Erro em buscar todos os chamados` }
        }
    }

    public async visualizarChamadosFinalizadosAtendente(func_id: number){
        try{
            //Busca todos os chamados do atendente desejado
            const chamadosAtendente = await this.chamadoRepository.find({
                where: {
                    funcionario: { func_id: func_id },
                    cha_status: 'Concluído'
                }
            })
            // Verificações
            if(!chamadosAtendente || chamadosAtendente.length === 0){
                return { success: false, message: `Nenhum chamado encontrado!`}
            }
            return { success: true, message: `Chamados encontrados!`, chamados: chamadosAtendente }
        }catch(error){
            console.error(`Erro em buscar todos os chamados do atendente: ${error}`)
            return { success: false, message: `Erro em buscar todos os chamados` }
        }
    }

    // Para Administrador
    public async visualizarTodosChamadosEmAtendimento(){
        try{
            // Busca todos os chamados
            const chamadosAdm = await this.chamadoRepository.find({
                where: {
                    cha_status: 'Em Atendimento'
                }
            })
            // Verificações
            if (!chamadosAdm || chamadosAdm.length === 0){
                return { success: false, message: `Nenhum chamado encontrado!`}
            }
            return { success: true, message: `Chamados encontrados!`, chamados: chamadosAdm }
        }catch(error){
            console.error(`Erro em buscar todos os chamados: ${error}`)
            return { success: false, message: `Erro em buscar todos os chamados` }
        }
    }

    public async visualizarTodosChamados(){
        try{
            // Busca todos os chamados
            const chamadosAdm = await this.chamadoRepository.find()
            // Verificações
            if (!chamadosAdm || chamadosAdm.length === 0){
                return { success: false, message: `Nenhum chamado encontrado!`}
            }
            return { success: true, message: `Chamados encontrados!`, chamados: chamadosAdm }
        }catch(error){
            console.error(`Erro em buscar todos os chamados: ${error}`)
            return { success: false, message: `Erro em buscar todos os chamados` }
        }
    }

    // Para Ambos (Atendente e Administrador)    
    public async visualizarChamadoEmEspera(){
        try{
            //Busca todos os chamados do atendente desejado
            const chamados = await this.chamadoRepository.find({
                where: {
                    cha_status: 'Aberto'
                }
            })
            // Verificações
            if(!chamados){
                return { success: false, message: `Nenhum chamado encontrado!`}
            }
            return { success: true, message: `Chamados encontrados!`, chamados }
        }catch(error){
            console.error(`Erro em buscar todos os chamados do atendente: ${error}`)
            return { success: false, message: `Erro em buscar todos os chamados` }
        }
    }
}

export default ChamadoService