import { Response, Request } from "express";
import { FuncionarioService } from "../services/funcionarioService";
import { IFuncionarioInput, IFuncionarioUpdate, IFuncionarioLoggin } from "../interfaces/IFuncionario";

export default class FuncionarioController {
    private funcionarioService: FuncionarioService;
    constructor() {
        this.funcionarioService = new FuncionarioService();
    }

    async cadastrarFuncionario(req: Request, res: Response) {
        try {
            const dadosFuncionario: IFuncionarioInput = req.body;
            const resultado = await this.funcionarioService.cadastrarFuncionario(dadosFuncionario);
            if (!resultado.success) {
                return res.status(400).json(resultado)
            } 
            return res.status(201).json(resultado)
        } catch (error) {
            console.error(`Erro no cadastro do funcionário: ${error}`);
            return res.status(500).json({ success: false, message: `Erro interno do servidor` });
        }
    }

    async editarFuncionario(req: Request, res: Response) {
        try {
            const id = Number(req.body.func_id);
            if (isNaN(id) || id <= 0) {
                return res.status(400).json({ success: false, message: 'ID do funcionário inválido' });
            }
            const dadosUpdate: IFuncionarioUpdate = req.body.dadosUpdate;
            const resultado = await this.funcionarioService.editarFuncionario(id, dadosUpdate);
            if (!resultado.success) {
                return res.status(400).json(resultado)
            } 
            return res.status(200).json(resultado)
        } catch (error) {
            console.error(`Erro em editar o funcionário: ${error}`);
            return res.status(500).json({ success: false, message: `Erro interno do servidor` });
        }
    }

    async visualizarFuncionario(req: Request, res: Response) {
        try {
            const id = req.params.id;  
            const resultado = await this.funcionarioService.visualizarFuncionario(parseInt(id));
            console.log(resultado);
            if (!resultado.success) {
                return res.status(400).json(resultado)
            } 
            return res.status(200).json(resultado)
        } catch (error) {
            console.error(`Erro em visualizar o funcionário: ${error}`);
            return res.status(500).json({ success: false, message: `Erro interno do servidor` });
        }
    }
    
    async visualizarPerfilFuncionario(req: Request, res: Response) {
        try {
            const id=  res.locals.userId;
            const resultado = await this.funcionarioService.visualizarFuncionario(parseInt(id));
            if (resultado.success) {
                return res.status(200).json(resultado);
            } else {
                return res.status(400).json(resultado);
            }
        } catch (error) {
            console.error(`Erro em visualizar o perfil do funcionário: ${error}`);
            return res.status(500).json({ success: false, message: `Erro interno do servidor` });
        }
    }

    async visualizarTodosFuncionarios(req: Request, res: Response) {
        try {
            const resultado = await this.funcionarioService.visualizarTodosFuncionarios();

            if (!resultado.success) {
                return res.status(400).json(resultado)
            } 
            return res.status(200).json(resultado)
        } catch (error) {
            console.error(`Erro visualizar todos os funcionarios: ${error}`);
            return res.status(500).json({ success: false, message: 'Erro interno do servidor' });
        }
    }

    async loginFuncionario(req: Request, res: Response) {
        try {
            const dadosLoggin: IFuncionarioLoggin = req.body;
            const resultado = await this.funcionarioService.loginFuncionario(dadosLoggin);

            if (!resultado.success) {
                return res.status(400).json(resultado)
            } 
            return res.status(200).json(resultado)
        } catch (error) {
            console.error(`Erro no login do funcionário: ${error}`);
            return res.status(500).json({ success: false, message: 'Erro interno do servidor' });
        }
    }

    async desativarFuncionario(req: Request, res: Response) {
        try {
            const id = Number(req.params.id);
            if (isNaN(id) || id <= 0) {
                return res.status(400).json({ success: false, message: 'ID do funcionário inválido' });
            }
            const resultado = await this.funcionarioService.desativarFuncionario(id);
            if (!resultado.success) {
                return res.status(400).json(resultado)
            } 
            return res.status(200).json(resultado)
        } catch (error) {
            console.error(`Erro em desativar funcionário: ${error}`);
            return res.status(500).json({ success: false, message: `Erro interno do servidor` });
        }
    }
}
