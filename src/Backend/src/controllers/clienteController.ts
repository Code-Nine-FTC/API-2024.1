import { Response,Request } from "express";
import { ClienteService } from "../services/clienteService";
import { IClienteInput, IClienteLoggin, IClienteUpdate } from "../interfaces/ICliente";
import { insertInvalidToken} from "./authMiddleware";

    export default class ClienteController{
        private clienteService: ClienteService
        constructor(){
            this.clienteService = new ClienteService()
        }
        async cadastrarCliente(req: Request, res: Response){
            console.log('Received POST request to /cadastroCliente');
            console.log(req.body)
            try{
                const dadosCliente: IClienteInput = req.body
                console.log('Request body:', dadosCliente);
                const resultado = await this.clienteService.cadastrarCliente(dadosCliente)
                if(resultado.success){
                    return res.status(201).json(resultado)
                }else{
                    return res.status(400).json(resultado)
                }
            }catch (error){
                console.error(`Erro no cadastro do cliente: ${error}`)
                return res.status(500).json({ success: false, message: `Erro interno do servidor` })
            }
        }
    async logginCliente(req: Request, res: Response){
        try{
            const dadosLogin: IClienteLoggin = req.body
            const resultado = await this.clienteService.logginCliente(dadosLogin)
            if(resultado.success){
                return res.status(200).json(resultado)
            }else{
                return res.status(400).json(resultado)
            }
        }catch (error){
            console.error(`Erro no logging do cliente: ${error}`)
            return res.status(500).json({success: false, message: `Erro interno do servidor`})
        }
    }
    logoutCliente(req: Request, res: Response) {
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
    async editarCliente(req: Request, res: Response){
        try{
            const id = Number(req.params.id)
            if (isNaN(id) || id <= 0) {
                return res.status(400).json({ success: false, message: 'ID do cliente inválido' });
            }
            const dadosUpdate: IClienteUpdate = req.body
            const resultado = await this.clienteService.editarCliente(id, dadosUpdate)
            if (resultado.success){
                return res.status(200).json(resultado)
            }else{
                return res.status(400).json(resultado)
            }
        }catch(error){
            console.error(`Erro em editar o cliente: ${error}`)
            return res.status(500).json({success: false, message: `Erro interno do servidor`})
        }
    }
    async visualizarCliente(req: Request, res: Response){
        try{
            const id: number = Number(req.params.id)
            if (isNaN(id) || id <= 0) {
                return res.status(400).json({ success: false, message: 'ID do cliente inválido' });
            }
            const resultado = await this.clienteService.visualizarCliente(id)
            if(resultado.success){
                return res.status(200).json(resultado)
            }else{
                return res.status(400).json(resultado)
            }
        }
        catch(error){
            console.error(`Erro em visualizar o cliente: ${error}`)
            return res.status(500).json({success: false, message: `Erro interno do servidor`})
        }
    }
    async desativarCliente(req: Request ,res: Response ){
        try{
            const id: number = Number(req.params.id)
            if (isNaN(id) || id <= 0) {
                return res.status(400).json({ success: false, message: 'ID do cliente inválido' });
            }
            const resultado = await this.clienteService.desativarCliente(id)
                if(resultado.success){
                    return res.status(200).json(resultado)
                }else{
                    return res.status(400).json(resultado)
                }
        }catch(error){
            console.error(`Erro em desativar cliente: ${error}`)
            return res.status(500).json({success: false, message: `Erro interno do servidor`})
        }
    }
}