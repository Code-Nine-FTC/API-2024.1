import { Request, Response } from "express";
import ChamadoService from "../services/chamadoService";

class ChamadoController {
    private chamadoService: ChamadoService
    constructor() {
        this.chamadoService = new ChamadoService()
    }

    //Para Cliente
    public async cadastrarChamado(req: Request, res: Response) {
        try {
            // Pega o id passado pela autenticação
            const cli_id = res.locals.userId
            if (isNaN(cli_id) || cli_id <= 0) {
                return res.status(400).json({ success: false, message: `Id do cliente inválido: ID ${cli_id}` });
            }
            // Pega todos os dados enviados pelo req body
            const { cha_titulo, cha_descricao, cat_id } = req.body

            // Verifica se os dados necessários foram fornecidos no corpo da requisição
            if (!cha_titulo || !cha_descricao || !cat_id) {
                return res.status(400).json({ success: false, message: "Por favor, forneça título, descrição e ID da categoria para cadastrar o chamado." });
            }

            // Monta os dados do chamado, incluindo o ID do cliente
            const dadosChamado = {
                cha_titulo,
                cha_descricao,
                cat_id,
                cli_id
            };
            // envia os dados para chamadoService.cadastrarChamado()
            const resultado = await this.chamadoService.cadastrarChamado(dadosChamado)

            if (!resultado.success) {
                return res.status(400).json(resultado)
            }
            return res.status(201).json(resultado)

        } catch (error) {
            console.error(`Erro no cadastro do chamado: ${error}`)
            return res.status(500).json({ success: false, message: `Erro interno do Servidor` })
        }
    }

    public async viewChamadosAtivosCliente(req: Request, res: Response) {
        try {
            //Pega o id do cliente passado pela autenticação
            const cli_id = res.locals.userId
            // Verificações
            if (isNaN(cli_id) || cli_id <= 0) {
                return res.status(400).json({ success: false, message: `Id do cliente inválido: ID ${cli_id}` });
            }
            // Passa o cli_id para a função no service
            const resultado = await this.chamadoService.visualizarChamadosAtivosCliente(parseInt(cli_id))

            if (!resultado.success) {
                return res.status(400).json(resultado)
            }
            return res.status(200).json(resultado)

        } catch (error) {
            console.error(`Erro em buscar todos os chamados ativos do cliente: ${error}`)
            return res.status(500).json({ success: false, message: `Erro interno do Servidor` })
        }
    }

    public async viewChamadosFinalizadosCliente(req: Request, res: Response) {
        try {
            //Pega o id do cliente passado pela autenticação
            const cli_id = res.locals.userId
            // Verificações
            if (isNaN(cli_id) || cli_id <= 0) {
                return res.status(400).json({ success: false, message: `Id do cliente inválido: ID ${cli_id}` });
            }
            // Passa o cli_id para a função no service
            const resultado = await this.chamadoService.visualizarChamadosFinalizadosCliente(parseInt(cli_id))

            if (!resultado.success) {
                return res.status(400).json(resultado)
            }
            return res.status(200).json(resultado)

        } catch (error) {
            console.error(`Erro em buscar todos os chamados ativos do cliente: ${error}`)
            return res.status(500).json({ success: false, message: `Erro interno do Servidor` })
        }
    }

    public async viewTodosChamadosCliente(req: Request, res: Response) {
        try {
            //Pega o id do cliente passado pela autenticação
            const cli_id = res.locals.userId
            // Verificações
            if (isNaN(cli_id) || cli_id <= 0) {
                return res.status(400).json({ success: false, message: `Id do cliente inválido: ID ${cli_id}` });
            }
            // Passa o cli_id para a função no service
            const resultado = await this.chamadoService.visualizarTodosChamadosCliente(parseInt(cli_id))

            if (!resultado.success) {
                return res.status(400).json(resultado)
            }
            return res.status(200).json(resultado)

        } catch (error) {
            console.error(`Erro em buscar todos os chamados ativos do cliente: ${error}`)
            return res.status(500).json({ success: false, message: `Erro interno do Servidor` })
        }
    }

    public async viewUltimoChamadoCliente(req: Request, res: Response) {
        try {
            //Pega o id do cliente passado pela autenticação
            const cli_id = res.locals.userId
            // Verificações
            if (isNaN(cli_id) || cli_id <= 0) {
                return res.status(400).json({ success: false, message: `Id do cliente inválido: ID ${cli_id}` });
            }
            // Passa o cli_id para a função no service
            const resultado = await this.chamadoService.visualizarUltimoChamadoCliente(parseInt(cli_id))

            if (!resultado.success) {
                return res.status(400).json(resultado)
            }
            return res.status(200).json(resultado)

        } catch (error) {
            console.error(`Erro em buscar todos os chamados ativos do cliente: ${error}`)
            return res.status(500).json({ success: false, message: `Erro interno do Servidor` })
        }
    }

    //Para Atendente
    public async viewChamadoEmAtendimentoAtendente(req: Request, res: Response) {
        try {
            //Pega o id do cliente passado pela autenticação
            const func_id = res.locals.userId
            // Verificações
            if (isNaN(func_id) || func_id <= 0) {
                return res.status(400).json({ success: false, message: `Id do cliente inválido: ID ${func_id}` });
            }
            // Passa o func_id para a função no service
            const resultado = await this.chamadoService.visualizarChamadoEmAtendimentoAtendente(parseInt(func_id))

            if (!resultado.success) {
                return res.status(400).json(resultado)
            }
            return res.status(200).json(resultado)

        } catch (error) {
            console.error(`Erro em buscar todos os chamados ativos do cliente: ${error}`)
            return res.status(500).json({ success: false, message: `Erro interno do Servidor` })
        }
    }

    public async viewChamadosFinalizadosAtendente(req: Request, res: Response) {
        try {
            //Pega o id do cliente passado pela autenticação
            const func_id = res.locals.userId
            // Verificações
            if (isNaN(func_id) || func_id <= 0) {
                return res.status(400).json({ success: false, message: `Id do cliente inválido: ID ${func_id}` });
            }
            // Passa o func_id para a função no service
            const resultado = await this.chamadoService.visualizarChamadosFinalizadosAtendente(parseInt(func_id))

            if (!resultado.success) {
                return res.status(400).json(resultado)
            }
            return res.status(200).json(resultado)

        } catch (error) {
            console.error(`Erro em buscar todos os chamados ativos do cliente: ${error}`)
            return res.status(500).json({ success: false, message: `Erro interno do Servidor` })
        }
    }

    public async viewUltimoChamadoAtendente(req: Request, res: Response) {
        try {
            //Pega o id do cliente passado pela autenticação
            const func_id = res.locals.userId
            // Verificações
            if (isNaN(func_id) || func_id <= 0) {
                return res.status(400).json({ success: false, message: `Id do atendente inválido: ID ${func_id}` });
            }
            // Passa o func_id para a função no service
            const resultado = await this.chamadoService.visualizarUltimoChamadoAtendente(parseInt(func_id))

            if (!resultado.success) {
                return res.status(400).json(resultado)
            }
            return res.status(200).json(resultado)

        } catch (error) {
            console.error(`Erro em buscar todos os chamados ativos do cliente: ${error}`)
            return res.status(500).json({ success: false, message: `Erro interno do Servidor` })
        }
    }

    public async iniciarAtendimentoController(req: Request, res: Response) {
        try {
            // Pega o id pela url
            const cha_id = req.params.cha_id
            console.log(cha_id)
            // Pega o id passado pela autenticação
            const func_id = res.locals.userId
            // Verificações
            if (isNaN(func_id) || func_id <= 0) {
                return res.status(400).json({ success: false, message: `Id do cliente inválido: ID ${func_id}` });
            }
            // chama função do service
            const resultado = await this.chamadoService.iniciarAtendimento(parseInt(cha_id), func_id)

            if (!resultado.success) {
                return res.status(400).json(resultado)
            }
            return res.status(200).json(resultado)

        } catch (error) {
            console.error(`Erro interno do servidor: ${error}`)
            return res.status(500).json({ success: false, message: `Erro interno do servidor`, error: error.message });
        }
    }

    public async finalizarAtendimentoController(req: Request, res: Response) {
        try {
            // Pega o id pela url
            const cha_id = req.params.cha_id
            // chama função do service
            const resultado = await this.chamadoService.finalizarAtendimento(parseInt(cha_id))

            if (!resultado.success) {
                return res.status(400).json(resultado)
            }
            return res.status(200).json(resultado)

        } catch (error) {
            console.error(`Erro interno do servidor: ${error}`)
            return res.status(500).json({ success: false, message: `Erro interno do servidor` });
        }
    }

    // Para Administrador
    public async viewTodosChamadosEmAtendimento(req: Request, res: Response) {
        try {
            // Chama a função no service
            const resultado = await this.chamadoService.visualizarTodosChamadosEmAtendimento()

            if (!resultado.success) {
                return res.status(400).json(resultado)
            }
            return res.status(200).json(resultado)

        } catch (error) {
            console.error(`Erro em buscar todos os chamados ativos do cliente: ${error}`)
            return res.status(500).json({ success: false, message: `Erro interno do Servidor` })
        }
    }

    public async viewTodosChamados(req: Request, res: Response) {
        try {
            // Chama a função no service
            const resultado = await this.chamadoService.visualizarTodosChamados()

            if (!resultado.success) {
                return res.status(400).json(resultado)
            }
            return res.status(200).json(resultado)

        } catch (error) {
            console.error(`Erro em buscar todos os chamados ativos do cliente: ${error}`)
            return res.status(500).json({ success: false, message: `Erro interno do Servidor` })
        }
    }

    public async direcionaChamadoController(req: Request, res: Response) {
        try {
            // Pega o id do chamado e do funcionario que foi enviado do corpo
            const { cha_id, func_id } = req.body
            
            // Verificações
            if (isNaN(func_id) || func_id <= 0) {
                return res.status(400).json({ success: false, message: `Id do funcionario inválido: ID ${func_id}` });
            }
            if (isNaN(cha_id) || cha_id <= 0) {
                return res.status(400).json({ success: false, message: `Id do chamado inválido: ID ${cha_id}` });
            }
            // chama a função do service
            const resultado = await this.chamadoService.direcionarAtendimento(parseInt(cha_id), parseInt(func_id))
            console.log(resultado)
            if (!resultado.success) {
                return res.status(400).json(resultado)
            }
            return res.status(200).json(resultado)

        } catch (error) {
            console.error(`Erro interno do servidor: ${error}`)
            return res.status(500).json({ success: false, message: `Erro interno do servidor` });

        }
    }

    public async listaFuncionarioDisponiveis(req: Request, res: Response) {
        try {
            const resultado = await this.chamadoService.listaFuncionarioDisponiveis()

            if (!resultado.success) {
                return res.status(400).json(resultado)
            }
            return res.status(200).json(resultado)
        } catch (error) {
            console.error(`Erro ao listar funcionários disponíveis: ${error}`)
            return res.status(500).json({ success: false, message: `Erro interno do Servidor` })
        }
    }

    //Para Ambos (Administrador e Atendente)
    public async viewChamadosEmEspera(req: Request, res: Response) {
        try {
            // Chama a função no service
            const resultado = await this.chamadoService.visualizarChamadoEmEspera()

            if (!resultado.success) {
                return res.status(400).json(resultado)
            }
            return res.status(200).json(resultado)
        } catch (error) {
            console.error(`Erro em buscar todos os chamados ativos do cliente: ${error}`)
            return res.status(500).json({ success: false, message: `Erro interno do Servidor` })
        }

    }

    public async dashboardPesquisaChamado(req: Request, res: Response) {
        try {
            const { cat_id } = req.params;
            if (!cat_id) {
                return res.status(400).json({ success: false, message: 'ID Categoria não fornecida' });
            }
            const resultado = await this.chamadoService.dashboardPesquisaChamado(Number(cat_id));
            if (!resultado.success) {
                return res.status(400).json(resultado);
            }
            return res.status(200).json(resultado);
        } catch (error) {
            console.error(`Erro ao contar chamados por categoria e status: ${error}`);
            return res.status(500).json({ success: false, message: 'Erro interno do Servidor' });
        }
    }

}
export default ChamadoController