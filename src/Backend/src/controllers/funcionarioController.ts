import { Response, Request } from "express";
import { FuncionarioService } from "../services/funcionarioService";
import { IFuncionarioInput, IFuncionarioUpdate, IFuncionarioLoggin } from "../interfaces/IFuncionario";
import { insertInvalidToken} from "./authMiddleware";

export default class FuncionarioController {
    private funcionarioService : FuncionarioService
    constructor (){
        this.funcionarioService=new FuncionarioService()
    }
    async cadastrarFuncionario(req: Request, res: Response) {
        console.log('Received POST request to /cadastroFuncinario');
        console.log(req.body)
        try {
            const dadosFuncionario: IFuncionarioInput = req.body;
            const resultado = await this.funcionarioService.cadastrarFuncionario(dadosFuncionario);
            if (resultado.success) {
                return res.status(201).json(resultado);
            } else {
                return res.status(400).json(resultado);
            }
        } catch (error) {
            console.error(`Erro no cadastro do funcionário: ${error}`);
            return res.status(500).json({ success: false, message: `Erro interno do servidor` });
        }
    }
    
    async editarFuncionario(req: Request, res: Response) {
        try {
            const id = Number(req.body.func_id)
            console.log(id)
            if (isNaN(id) || id <= 0) {
                return res.status(400).json({ success: false, message: 'ID do funcionário inválido' });
            }
            const dadosUpdate: IFuncionarioUpdate = req.body
            const resultado = await this.funcionarioService.editarFuncionario(id, dadosUpdate)
            if (resultado.success) {
                return res.status(200).json(resultado)
            } else {
                return res.status(400).json(resultado)
            }
        } catch (error) {
            console.error(`Erro em editar o funcionário: ${error}`)
            return res.status(500).json({ success: false, message: `Erro interno do servidor` })
        }
    }

    async visualizarFuncionario(req: Request, res: Response) {
        try {
            const id = Number(req.body.func_id)
            if (isNaN(id) || id <= 0) {
                return res.status(400).json({ success: false, message: 'ID do funcionário inválido' });
            }
            const resultado = await this.funcionarioService.visualizarFuncionario(id)
            if (resultado.success) {
                return res.status(200).json(resultado)
            } else {
                return res.status(400).json(resultado)
            }
        } catch (error) {
            console.error(`Erro em visualizar o funcionário: ${error}`)
            return res.status(500).json({ success: false, message: `Erro interno do servidor` })
        }
    }

    async visualizarTodosFuncionarios(req: Request, res: Response): Promise<Response> {
        const funcionarioService = new FuncionarioService();
        const result = await funcionarioService.visualizarTodosFuncionarios();

        if (result.success) {
            return res.status(200).json(result);
        } else {
            return res.status(404).json(result);
        }
    }

    async logginFuncionario(req: Request, res: Response) {
        try {
            const dadosLoggin: IFuncionarioLoggin = req.body;
            console.log(dadosLoggin)
            const resultado = await this.funcionarioService.logginFuncionario(dadosLoggin);
    
            if (resultado.success) {
                return res.status(200).json(resultado);
            } else {
                return res.status(400).json(resultado);
            }
        } catch (error) {
            console.error(`Erro no login do funcionário: ${error}`);
            return res.status(500).json({ success: false, message: 'Erro interno do servidor' });
        }
    }
    logoutFuncionario(req: Request, res: Response) {
        try {
            const authHeader = req.headers['authorization'];
            console.log(authHeader)
            const token = authHeader && authHeader.split(' ')[1];

            if (!token) {
                return res.status(400).json({ success: false, message: 'Token não fornecido' });
            }
            // Adicione o token inválido ao conjunto de tokens inválidos 
            insertInvalidToken(token)
            return res.status(200).json({success: true, message: 'Logout realizado'})
        } catch (error) {
            console.error(`Erro no logout do funcionário: ${error}`);
            return res.status(500).json({ success: false, message: 'Erro interno do servidor' });
        }
    }
    async desativarFuncionario(req: Request, res: Response) {
        try {
            const id = Number(req.body.func_id)
            if (isNaN(id) || id <= 0) {
                return res.status(400).json({ success: false, message: 'ID do funcionário inválido' });
            }
            const resultado = await this.funcionarioService.desativarFuncionario(id)
            if (resultado.success) {
                return res.status(200).json(resultado)
            } else {
                return res.status(400).json(resultado)
            }
        } catch (error) {
            console.error(`Erro em desativar funcionário: ${error}`)
            return res.status(500).json({ success: false, message: `Erro interno do servidor` })
        }
    }

}