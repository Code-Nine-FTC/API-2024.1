import { Response, Request } from "express"
import { ClienteService } from "../services/clienteService"
import { IClienteInput, IClienteLoggin, IClienteUpdate } from "../interfaces/ICliente"
import  ChamadoService from '../services/chamadoService'

export default class ClienteController {
    private clienteService: ClienteService;
    private chamadoService: ChamadoService; 

    constructor() {
        this.clienteService = new ClienteService();
        this.chamadoService = new ChamadoService(); 
    }
    async cadastrarCliente(req: Request, res: Response) {
        try {
            const dadosCliente: IClienteInput = req.body
            const resultado = await this.clienteService.cadastrarCliente(dadosCliente)
            if (!resultado.success) {
                return res.status(400).json(resultado)
            } 
            return res.status(201).json(resultado)
        } catch (error) {
            console.error(`Erro no cadastro do cliente: ${error}`)
            return res.status(500).json({ success: false, message: `Erro interno do servidor` })
        }
    }
    async loginCliente(req: Request, res: Response) {
        try {
            const dadosLogin: IClienteLoggin = req.body
            const resultado = await this.clienteService.logginCliente(dadosLogin)
            if (!resultado.success) {
                return res.status(400).json(resultado)
            } 
            return res.status(200).json(resultado)
        } catch (error) {
            console.error(`Erro na autenticação do cliente: ${error}`)
            return res.status(500).json({ success: false, message: `Erro interno do servidor` })
        }
    }
    
    async editarCliente(req: Request, res: Response) {
        try {
            const id = res.locals.userId;
            if (isNaN(id) || id <= 0) {
                return res.status(400).json({ success: false, message: 'ID do cliente inválido' });
            }
            const dadosUpdate: IClienteUpdate = req.body.dadosUpdate;
            const resultado = await this.clienteService.editarCliente(id, dadosUpdate);
    
            if (!resultado.success) {
                return res.status(400).json(resultado)
            } 
            return res.status(200).json(resultado)
        } catch (error) {
            console.error(`Erro em editar o cliente: ${error}`);
            return res.status(500).json({ success: false, message: `Erro interno do servidor` });
        }
    }
    
    async visualizarCliente(req: Request, res: Response) {
        try {
            const id = res.locals.userId;
            if (isNaN(id) || id <= 0) {
                return res.status(400).json({ success: false, message: 'ID do cliente inválido' })
            }
            const resultado = await this.clienteService.visualizarCliente(id)
            if (!resultado.success) {
                return res.status(400).json(resultado)
            } 
            return res.status(200).json(resultado)
        }
        catch (error) {
            console.error(`Erro em visualizar o cliente: ${error}`)
            return res.status(500).json({ success: false, message: `Erro interno do servidor` })
        }
    }
    public async desativarCliente(req: Request, res: Response) {
        try {
            const id = res.locals.userId
            if (isNaN(id) || id <= 0) {
                return res.status(400).json({ success: false, message: 'ID do cliente inválido' })
            }
            const resultado = await this.clienteService.desativarCliente(id, this.chamadoService)
            if (!resultado.success) {
                return res.status(400).json(resultado)
            } 
            return res.status(200).json(resultado)
        } catch (error) {
            console.error(`Erro em desativar cliente: ${error}`)
            return res.status(500).json({ success: false, message: `Erro interno do servidor` })
        }
    }
}