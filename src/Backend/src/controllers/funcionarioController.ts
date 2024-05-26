import { Response, Request } from "express";
import { FuncionarioService } from "../services/funcionarioService";
import { IFuncionarioInput, IFuncionarioUpdate, IFuncionarioLoggin } from "../interfaces/IFuncionario";

export default class FuncionarioController {
    private funcionarioService: FuncionarioService;
    constructor() {
        this.funcionarioService = new FuncionarioService();
    }

    async cadastrarFuncionario(req: Request, res: Response) {
        console.log('Received POST request to /cadastrarFuncionario'); // Corrigido o nome da rota
        console.log(req.body);
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
            const id = Number(req.body.func_id);
            console.log(id);
            if (isNaN(id) || id <= 0) {
                return res.status(400).json({ success: false, message: 'ID do funcionário inválido' });
            }
            const dadosUpdate: IFuncionarioUpdate = req.body.dadosUpdate;
            console.log(dadosUpdate);
            const resultado = await this.funcionarioService.editarFuncionario(id, dadosUpdate);
            if (resultado.success) {
                return res.status(200).json(resultado);
            } else {
                return res.status(400).json(resultado);
            }
        } catch (error) {
            console.error(`Erro em editar o funcionário: ${error}`);
            return res.status(500).json({ success: false, message: `Erro interno do servidor` });
        }
    }

    async visualizarFuncionario(req: Request, res: Response) {
        try {
            console.log('Recebendo informações /viewFuncionario')
            const id = req.body.func_id;  
            const resultado = await this.funcionarioService.visualizarFuncionario(parseInt(id));
            console.log(resultado);
            if (resultado.success) {
                return res.status(200).json(resultado);
            } else {
                return res.status(400).json(resultado);
            }
        } catch (error) {
            console.error(`Erro em visualizar o funcionário: ${error}`);
            return res.status(500).json({ success: false, message: `Erro interno do servidor` });
        }
    }
    
    async visualizarPerfilFuncionario(req: Request, res: Response) {
        try {
            const id=  res.locals.userId;
            const resultado = await this.funcionarioService.visualizarFuncionario(parseInt(id));
            console.log(resultado);
            if (resultado.success) {
                return res.status(200).json(resultado);
            } else {
                return res.status(400).json(resultado);
            }
        } catch (error) {
            console.error(`Erro em visualizar o funcionário: ${error}`);
            return res.status(500).json({ success: false, message: `Erro interno do servidor` });
        }
    }

    async visualizarTodosFuncionarios(req: Request, res: Response) {
        try {
            const result = await this.funcionarioService.visualizarTodosFuncionarios();

            if (result.success) {
                return res.status(200).json(result);
            } else {
                return res.status(404).json(result);
            }
        } catch (error) {
            console.error(`Erro visualizar todos os funcionarios: ${error}`);
            return res.status(500).json({ success: false, message: 'Erro interno do servidor' });
        }
    }

    async logginFuncionario(req: Request, res: Response) {
        try {
            const dadosLoggin: IFuncionarioLoggin = req.body;
            console.log(dadosLoggin);
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

    async desativarFuncionario(req: Request, res: Response) {
        try {
            const id = Number(req.body.func_id);
            console.log(id)
            if (isNaN(id) || id <= 0) {
                return res.status(400).json({ success: false, message: 'ID do funcionário inválido' });
            }
            const resultado = await this.funcionarioService.desativarFuncionario(id);
            if (resultado.success) {
                return res.status(200).json(resultado);
            } else {
                return res.status(400).json(resultado);
            }
        } catch (error) {
            console.error(`Erro em desativar funcionário: ${error}`);
            return res.status(500).json({ success: false, message: `Erro interno do servidor` });
        }
    }
}
