import { copyFileSync } from "fs";
import { Connection } from "../config/data-source";
import Categoria from "../entities/categoria";
import Chamado from "../entities/chamado";
import Funcionario from "../entities/funcionario";
import { IChamadoInput } from "../interfaces/IChamado";
import { In } from "typeorm";

class ChamadoService{
    private chamadoRepository = Connection.getRepository(Chamado)
    private funcionarioRepository = Connection.getRepository(Funcionario)

    //Para Cliente
    // cria novo chamado
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
            const chamadoSalvo = await this.chamadoRepository.save(novoChamado)


            return { success: true, message: `Chamado criado com sucesso!`, chamadoId: chamadoSalvo.cha_id }
        }catch(error){
            console.error(`Erro ao cadastrar chamado: ${error}`)
            return { success: false, message: `Erro ao cadastrar chamado.` }
        }
    }
    
    // chamados ativos
    public async visualizarChamadosAtivosCliente(cli_id: number){
        try{
            // Busca os chamados do cliente desejado
            console.log('Recebendo dados em Visualizar Chamados Ativos Cliente: ', cli_id)
            const chamadosCliente = await this.chamadoRepository.find({ 
                where: {
                    cliente: { cli_id: cli_id } ,// usa o relacionamento do cliente para a busca
                    cha_status: In(['Em Andamento', 'Em Aberto'])
                }, order: {
                    cha_data_inicio: 'DESC' // ordenando do mais recente para o mais antigo
                }
            })
            console.log('service',chamadosCliente)
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
    
    // chamados finalizados cliente
    public async visualizarChamadosFinalizadosCliente(cli_id: number){
        try{
            // Busca os chamados do cliente desejado
            const chamadosCliente = await this.chamadoRepository.find({ 
                where: {
                    cliente: { cli_id: cli_id } ,// usa o relacionamento do cliente para a busca
                    cha_status: 'Concluido'
                }, order: {
                    cha_data_inicio: 'DESC' // ordenando do mais recente para o mais antigo
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

    // todos chamados cliente
    public async visualizarTodosChamadosCliente(cli_id: number){
        try{
            // Busca os chamados do cliente desejado
            const chamadosCliente = await this.chamadoRepository.find({ 
                where: {
                    cliente: { cli_id: cli_id } ,// usa o relacionamento do cliente para a busca
                }, order: {
                    cha_data_inicio: 'DESC' // ordenando do mais recente para o mais antigo
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
    
    // chamado aberto mais recente
    public async visualizarUltimoChamadoCliente(cli_id: number){
        try{
            // Busca os chamados do cliente desejado
            const chamadoCliente = await this.chamadoRepository.findOne({ 
                where: {
                    cliente: { cli_id: cli_id }, // usa o relacionamento do cliente para a busca
                    cha_status: In(['Em Andamento', 'Em Aberto'])
                }, order: {
                    cha_data_inicio: 'DESC' // ordenando do mais recente para o mais antigo
                }
            })
            // verificação
            if (!chamadoCliente){
                return { success: false, message: `Nenhum chamado encontrado!`}
            }
            return { success: true, message: `Chamados encontrados!`, chamados: chamadoCliente  }
        }catch(error){
            console.error(`Erro em buscar todos os chamados do cliente: ${error}`)
            return { success: false, message: `Erro em buscar todos os chamados` }
        }
    }

   // Cancela cada chamado do cliente assim que for assionado!
    public async cancelarChamado(cli_id: number){
        try{
            // Busca todos os chamados do cliente pela relação chamado/cliente
            const chamados = await this.chamadoRepository.find({
                where: { cliente: {cli_id: cli_id}} 
            })

            // verifica se o array é do tamanho 0
            if (chamados.length === 0){
                return { success: false, message: `Nenhum chamado encontrado!` }
            }

            // para cada elemento do array 
            for (const chamado of chamados){
                chamado.cha_status = 'Cancelado'
            }

            // salva o status
            await this.chamadoRepository.save(chamados)

            return { success: true, message: `Chamados cancelados com sucesso!` }

        }catch(error){
            console.error(`Erro em cancelar chamados do cliente: ${error}`)
            return { success: false, message: `Erro em cancelar os chamados` }
        }
    }

    // Para Atendente
    // em atendimento
    public async visualizarChamadoEmAtendimentoAtendente(func_id: number){
        try{
            console.log('Recebendo dados em Visualizar Chamados Ativos Atendente: ', func_id)
            //Busca todos os chamados do atendente desejado
            const chamadoAtendente = await this.chamadoRepository.find({
                where: {
                    funcionario: { func_id: func_id },
                    cha_status: 'Em Andamento'
                }
            })
            // Verificações
            if(!chamadoAtendente){
                return { success: false, message: `Nenhum chamado encontrado!`}
            }
            return { success: true, message: `Chamados encontrados!`, chamados: chamadoAtendente }
        }catch(error){
            console.error(`Erro em buscar todos os chamados do atendente: ${error}`)
            return { success: false, message: `Erro em buscar todos os chamados` }
        }
    }

    // chamados finalizados
    public async visualizarChamadosFinalizadosAtendente(func_id: number){
        try{
            console.log('Recebendo dados em Visualizar Chamados Finalizados Atendente: ', func_id)
            //Busca todos os chamados do atendente desejado
            const chamadosAtendente = await this.chamadoRepository.find({
                where: {
                    funcionario: { func_id: func_id },
                    cha_status: 'Concluido'
                }, order: {
                    cha_data_inicio: 'DESC' // ordenando do mais recente para o mais antigo
                }
            })
            // Verificações
            if(!chamadosAtendente || chamadosAtendente.length === 0){
                return { success: false, message: `Nenhum chamado encontrado!`}
            }
            console.log('Chamados finalizados encontrados: ', chamadosAtendente)
            return { success: true, message: `Chamados encontrados!`, chamados: chamadosAtendente }
        }catch(error){
            console.error(`Erro em buscar todos os chamados do atendente: ${error}`)
            return { success: false, message: `Erro em buscar todos os chamados` }
        }
    }

    public async visualizarUltimoChamadoAtendente(func_id: number){
        try{
            // Busca os chamados do cliente desejado
            console.log('Buscando ultimo chamado do atendente', func_id)
            const chamadoAtendente = await this.chamadoRepository.findOne({ 
                where: {
                    funcionario: { func_id: func_id } , // usa o relacionamento do cliente para a busca
                    cha_status: In(['Em Andamento'])
                }, order: {
                    cha_data_inicio: 'DESC' // ordenando do mais recente para o mais antigo
                }
            })
            // verificação
            if (!chamadoAtendente){
                return { success: false, message: `Nenhum chamado encontrado!`}
            }
            console.log('Ultimo chamado do atendente encontrado ', chamadoAtendente)
            return { success: true, message: `Chamados encontrados!`, chamados: chamadoAtendente  }
        }catch(error){
            console.error(`Erro em buscar todos os chamados do atendente: ${error}`)
            return { success: false, message: `Erro em buscar todos os chamados` }
        }
    }

    // Inicia atendimento
    public async iniciarAtendimento(cha_id: number, func_id: number) {
        try {
            // Buscando as informações do chamado que vai ser atendido
            console.log('Iniciando chamado: ', cha_id, func_id)
            const chamado = await this.chamadoRepository.findOne({
                where: { cha_id: cha_id },
                relations: ['funcionario'] // Carrega todas informações relacionada a relação com funcionario
            });
            console.log('deu certo', chamado)
            // Verificando se ele foi encontrado!
            if (!chamado) { 
                console.log('Chamado não encontrado')
                return { success: false, message: `Chamado não encontrado!` };
            }

            // Verifica se existe um funcionario associado
            if (chamado.funcionario) {
                console.log('Chamado em atendimento')
                return { success: false, message: `Chamado em atendimento!` };
            }

            // Verifica se o status do chamado nao esta cancelado
            if(chamado.cha_status === 'Cancelado'){
                console.log('Chamado cancelado')
                return { success: false, message: `Não é possivel iniciar o atendimento desse chamado!` }
            }

            // Busca funcionario 
            const funcionario = await this.funcionarioRepository.findOne({
                where: { func_id: func_id }
            });
            console.log('Funcionario encontrado: ', funcionario)
            if (funcionario.func_is_admin){
                console.log('Funcionario é admin')
                return { success: false, message: `Esse funcionario não pode realizar atendimento!` }
            }

            if (!funcionario) {
                console.log('Funcionario não encontrado')
                return { success: false, message: `Funcionario não encontrado!` };
            }

            // Verifica se o funcionario já está atendendo um chamado
            const funcionarioOcupado = await this.chamadoRepository.findOne({
                where: { funcionario: { func_id: func_id }, cha_status: 'Em Andamento' }
            });

            if (funcionarioOcupado) {
                return { success: false, message: `Finalize o atendimento que está sendo realizado antes de iniciar um novo atendimento!` };
            }

            // Mudando o Status do Chamado
            chamado.cha_status = 'Em Andamento';
            // Atribuindo ao Funcionario que iniciou
            chamado.funcionario = funcionario;
            // Salvando as alterações
            await this.chamadoRepository.save(chamado);

            return { success: true, message: `Chamado atribuido com sucesso!` };
        } catch (error) {
            console.error(`Erro ao atribuir chamado ao funcionario: ${error}`);
            return { success: false, message: `Erro ao atribuir chamado`, error: error.message };
        }
    }

    // Finalizar chamado Atendente
    public async finalizarAtendimento(cha_id: number){
        try{
            const chamado = await this.chamadoRepository.findOne({
                where: {cha_id: cha_id}
            })
            if (!chamado){
                return { success: false, message: `Chamado não encontrado!`,  }
            }
            if (chamado.cha_status !== 'Em Andamento'){
                return { success: false, message: `Não é possivel finalizar onde não está sendo atendido!` }
            }
            // mudando status do chamado para concluido!
            chamado.cha_status = 'Concluido'
            // adicionando data e hora que foi finalizado
            chamado.cha_data_final = new Date()
            // salvando mudanças
            await this.chamadoRepository.save(chamado)

            return { success: true, message: `Chamado Finalizado!` }
        }catch(error){
            console.error(`Erro em finalizar chamado: ${error}`)
            return { success: false, message: `Erro em finalizar chamado!`, error: error.message }
        }
    }

    // Para Administrador
    // chamados em atendimento adm
    public async visualizarTodosChamadosEmAtendimento(){
        try{
            // Busca todos os chamados
            const chamadosAdm = await this.chamadoRepository.find({
                where: {
                    cha_status: 'Em Andamento'
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

    //  todos os chamados Adm
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

    // Direciona atendimento ao atendente 
    public async direcionarAtendimento(cha_id: number, func_id: number) {
        try {
            // Busca chamado 
            const chamado = await this.chamadoRepository.findOne({
                where: { cha_id: cha_id },
                relations: ['funcionario'] 
            });

            // Verifica se ele existe
            if (!chamado) {
                return { success: false, message: `Chamado não encontrado!` };
            }

            // Verifica se o status do chamado nao esta cancelado
            if(chamado.cha_status !== 'Cancelado'){
                return { success: false, message: `Não é possivel direcionar o atendimento desse chamado!` }
            }

            // Busca funcionario 
            const funcionario = await this.funcionarioRepository.findOne({
                where: { func_id: func_id }
            });

            if (!funcionario) {
                return { success: false, message: `Funcionario não encontrado!` };
            }

            // Direciona para um atendente o chamado 
            chamado.funcionario = funcionario;
            // Salva 
            await this.chamadoRepository.save(chamado);

            return { success: true, message: `Chamado direcionado com sucesso!` };
        } catch (error) {
            console.error(`Erro ao direcionar chamado para um atendente: ${error}`);
            return { success: false, message: `Erro ao direcionar chamado` };
        }
    }

    // Para Ambos (Atendente e Administrador)    
    public async visualizarChamadoEmEspera(){
        try{
            //Busca todos os chamados do atendente desejado
            const chamados = await this.chamadoRepository.find({
                where: {
                    cha_status: 'Em Aberto'
                }
            })
            // Verificações
            if(chamados.length === 0){
                return { success: false, message: `Nenhum chamado encontrado!`}
            }

            return { success: true, message: `Chamados encontrados!`, chamados }

        }catch(error){
            console.error(`Erro em buscar todos os chamados do atendente: ${error}`)
            return { success: false, message: `Erro em buscar todos os chamados` }
        }
    }

    // SLA
    public async verificarSLA(){
        try {
            // busca todos os chamados que estão em andamento e aberto
            const chamados = await this.chamadoRepository.find({
                where: [
                    { cha_status: 'Em Andamento' },
                    { cha_status: 'Em Aberto' }
                ],
                relations: ['categoria']
            });
    
            const agora = new Date(); // pega a data e hora atuais
    
            for (const chamado of chamados) {
                if (chamado.categoria) {
                    const horario = chamado.categoria.cat_horario; // pega o horário previsto da categoria    
                    // Converte o horário de "HH:MM:SS" para horas decimais
                    const horarioDecimal = this.converterHoraParaDecimal(horario);    
                    // Faz o cálculo em milissegundos e transforma em horas
                    const tempoDecorrido = (agora.getTime() - new Date(chamado.cha_data_inicio).getTime()) / (1000 * 60 * 60);
                    if (tempoDecorrido > horarioDecimal) {
                        chamado.cha_prioridade = 'alta';
                        await this.chamadoRepository.save(chamado);
                    }
                }
            }
            return { success: true, message: 'SLA verificado e atualizado com sucesso.' };
        } catch (error) {
            console.error(`Erro ao verificar SLA: ${error}`);
            return { success: false, message: 'Erro ao verificar SLA.' };
        }
    }

    // Função para converter "HH:MM:SS" para horas decimais
    converterHoraParaDecimal(horario) {
    const [horas, minutos, segundos] = horario.split(':').map(Number);
    return horas + (minutos / 60) + (segundos / 3600);
    }

    public async listaFuncionarioDisponiveis() {
        try {
            const horarioAtual = new Date();
            let todosFuncionarios;
            let chamadosAtivos;
            try {
                todosFuncionarios = await this.funcionarioRepository.createQueryBuilder("funcionario")
                    .where("funcionario.func_expediente_inicio <= :horarioAtual")
                    .andWhere("funcionario.func_expediente_final >= :horarioAtual")
                    .andWhere("funcionario.ativo = :ativo", { ativo: true })
                    .setParameter("horarioAtual", horarioAtual)
                    .getMany();
    
                chamadosAtivos = await this.chamadoRepository.createQueryBuilder("chamado")
                    .leftJoinAndSelect("chamado.funcionario", "funcionario")
                    .where("chamado.cha_status != :status", { status: 'Concluído' })
                    .getMany();
            } catch (error) {
                console.error(`Erro ao buscar funcionários e chamados ativos: ${error}`);
                return { success: false, message: `Erro em buscar todos os chamados` };
            }
    
            const funcionariosAtendendoUmChamado = chamadosAtivos.map(chamado => chamado.funcionario.id);
            const funcionariosDisponiveis = todosFuncionarios.filter(funcionario => !funcionariosAtendendoUmChamado.includes(funcionario.id));
    
            if (!funcionariosDisponiveis || funcionariosDisponiveis.length === 0) {
                return { success: false, message: 'Nenhum funcionário disponível no momento.' };
            }
    
            return {
                success: true,
                message: 'Funcionários disponíveis encontrados!',
                funcionarios: funcionariosDisponiveis
            };
        } catch (error) {
            console.error(`Erro ao listar funcionários disponíveis: ${error}`);
            return { success: false, message: error.message };
        }
    }     

    public async contarChamadosPorCategoriaEStatus(cat_id: number) {
        try {
            const chamadosPorStatus = await this.chamadoRepository.createQueryBuilder("chamado")
                .select("chamado.cha_status, COUNT(chamado.cha_id) AS total")
                .where("chamado.cat_id = :cat_id", { cat_id })
                .groupBy("chamado.cha_status")
                .getRawMany();
            return { success: true, chamadosPorStatus };
        } catch (error) {
            console.error(`Erro em contar chamados por categoria e status: ${error}`);
            return { success: false, message: 'Erro ao contar chamados por categoria e status' };
        }
    }
    
}

export default ChamadoService