import { Request, Response } from "express";
import ChamadoService from "../services/chamadoService";
import { ClienteService } from "../services/clienteService";

class ChamadoController{
    private chamadoService: ChamadoService
    constructor(){
       this.chamadoService = new ChamadoService()
    }
    
    //Para Cliente
    public async cadastrarChamado(req: Request, res: Response){
        try{
            // Pega o id passado pela autenticação
            const cli_id = res.locals.userId
            if( isNaN(cli_id) || cli_id<= 0){
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

            if(!resultado.success){
                return res.status(400).json(resultado)
            }
            return res.status(201).json(resultado)

        }catch(error){
            console.error(`Erro no cadastro do chamado: ${error}`)
            return res.status(500).json({ success: false, message: `Erro interno do Servidor` })
        }
    }

    public async viewChamadosAtivosCliente(req: Request, res: Response){
        try{
            //Pega o id do cliente passado pela autenticação
            const cli_id = res.locals.userId
            // Verificações
            if( isNaN(cli_id) || cli_id<= 0){
                return res.status(400).json({ success: false, message: `Id do cliente inválido: ID ${cli_id}` });
            }
            // Passa o cli_id para a função no service
            const resultado = await this.chamadoService.visualizarChamadosAtivosCliente(parseInt(cli_id))
            
            if(!resultado.success){
                return res.status(400).json(resultado)
            }
            return res.status(200).json(resultado)

        }catch(error){
            console.error(`Erro em buscar todos os chamados ativos do cliente: ${error}`)
            return res.status(500).json({ success: false, message: `Erro interno do Servidor` })
        }
    }

    public async viewChamadosFinalizadosCliente(req: Request, res: Response){
        try{
            //Pega o id do cliente passado pela autenticação
            const cli_id = res.locals.userId
            // Verificações
            if( isNaN(cli_id) || cli_id<= 0){
                return res.status(400).json({ success: false, message: `Id do cliente inválido: ID ${cli_id}` });
            }
            // Passa o cli_id para a função no service
            const resultado = await this.chamadoService.visualizarChamadosFinalizadosCliente(parseInt(cli_id))
            
            if(!resultado.success){
                return res.status(400).json(resultado)
            }
            return res.status(200).json(resultado)

        }catch(error){
            console.error(`Erro em buscar todos os chamados ativos do cliente: ${error}`)
            return res.status(500).json({ success: false, message: `Erro interno do Servidor` })
        }
    }

    public async viewTodosChamadosCliente(req: Request, res: Response){
        try{
            //Pega o id do cliente passado pela autenticação
            const cli_id = res.locals.userId
            // Verificações
            if( isNaN(cli_id) || cli_id<= 0){
                return res.status(400).json({ success: false, message: `Id do cliente inválido: ID ${cli_id}` });
            }
            // Passa o cli_id para a função no service
            const resultado = await this.chamadoService.visualizarTodosChamadosCliente(parseInt(cli_id))
            
            if(!resultado.success){
                return res.status(400).json(resultado)
            }
            return res.status(200).json(resultado)

        }catch(error){
            console.error(`Erro em buscar todos os chamados ativos do cliente: ${error}`)
            return res.status(500).json({ success: false, message: `Erro interno do Servidor` })
        }
    }
    
    public async viewUltimoChamadoCliente(req: Request, res: Response){
        try{
            //Pega o id do cliente passado pela autenticação
            const cli_id = res.locals.userId
            // Verificações
            if( isNaN(cli_id) || cli_id<= 0){
                return res.status(400).json({ success: false, message: `Id do cliente inválido: ID ${cli_id}` });
            }
            // Passa o cli_id para a função no service
            const resultado = await this.chamadoService.visualizarUltimoChamadoCliente(parseInt(cli_id))
            
            if(!resultado.success){
                return res.status(400).json(resultado)
            }
            return res.status(200).json(resultado)

        }catch(error){
            console.error(`Erro em buscar todos os chamados ativos do cliente: ${error}`)
            return res.status(500).json({ success: false, message: `Erro interno do Servidor` })
        }
    }

    //Para Atendente
    public async viewChamadoEmAtendimentoAtendente(req: Request, res: Response){
        try{
            //Pega o id do cliente passado pela autenticação
            const func_id = res.locals.userId
            // Verificações
            if( isNaN(func_id) || func_id<= 0){
                return res.status(400).json({ success: false, message: `Id do cliente inválido: ID ${func_id}` });
            }
            // Passa o func_id para a função no service
            const resultado = await this.chamadoService.visualizarChamadoEmAtendimentoAtendente(parseInt(func_id))
            
            if(!resultado.success){
                return res.status(400).json(resultado)
            }
            return res.status(200).json(resultado)

        }catch(error){
            console.error(`Erro em buscar todos os chamados ativos do cliente: ${error}`)
            return res.status(500).json({ success: false, message: `Erro interno do Servidor` })
        }
    }

    public async viewChamadosFinalizadosAtendente(req: Request, res: Response){
        try{
            //Pega o id do cliente passado pela autenticação
            const func_id = res.locals.userId
            // Verificações
            if( isNaN(func_id) || func_id<= 0){
                return res.status(400).json({ success: false, message: `Id do cliente inválido: ID ${func_id}` });
            }
            // Passa o func_id para a função no service
            const resultado = await this.chamadoService.visualizarChamadosFinalizadosAtendente(parseInt(func_id))
            
            if(!resultado.success){
                return res.status(400).json(resultado)
            }
            return res.status(200).json(resultado)

        }catch(error){
            console.error(`Erro em buscar todos os chamados ativos do cliente: ${error}`)
            return res.status(500).json({ success: false, message: `Erro interno do Servidor` })
        }
    }

    // Para Administrador
    public async viewTodosChamadosEmAtendimento(req: Request, res: Response){
        try{
            // Chama a função no service
            const resultado = await this.chamadoService.visualizarTodosChamadosEmAtendimento()
            
            if(!resultado.success){
                return res.status(400).json(resultado)
            }
            return res.status(200).json(resultado)

        }catch(error){
            console.error(`Erro em buscar todos os chamados ativos do cliente: ${error}`)
            return res.status(500).json({ success: false, message: `Erro interno do Servidor` })
        }
    }

    public async viewTodosChamados(req: Request, res: Response){
        try{
            // Chama a função no service
            const resultado = await this.chamadoService.visualizarTodosChamados()
            
            if(!resultado.success){
                return res.status(400).json(resultado)
            }
            return res.status(200).json(resultado)

        }catch(error){
            console.error(`Erro em buscar todos os chamados ativos do cliente: ${error}`)
            return res.status(500).json({ success: false, message: `Erro interno do Servidor` })
        }
    }

    //Para Ambos (Administrador e Atendente)
    public async viewChamadosEmEspera(req: Request, res: Response){
        try{
            // Chama a função no service
            const resultado = await this.chamadoService.visualizarChamadoEmEspera()
            
            if(!resultado.success){
                return res.status(400).json(resultado)
            }
            return res.status(200).json(resultado)

        }catch(error){
            console.error(`Erro em buscar todos os chamados ativos do cliente: ${error}`)
            return res.status(500).json({ success: false, message: `Erro interno do Servidor` })
        }
    }


}
export default ChamadoController