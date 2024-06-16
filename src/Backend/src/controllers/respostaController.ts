import { Response, Request } from "express";
import { IRespostaInput } from "../interfaces/IRespostas";
import RespostaService from "../services/respostaService";
export default class RespostaController {
    private respostaService: RespostaService
    constructor() {
        this.respostaService = new RespostaService()
    }

    public async enviarMensagem(req: Request, res: Response) {
        try {
            const dadosMensagem: IRespostaInput = req.body
            const resultado = await this.respostaService.enviarMensagem(dadosMensagem)
            if (!resultado.success) {
                return res.status(400).json(resultado)
            }
            return res.status(201).json(resultado)
        }
        catch (error) {
            console.error(`Erro ao enviar a mensagem: ${error}`)
            return res.status(500).json({ success: false, message: `Erro interno no servidor`})
        }
    }
    public async buscarChamado(req: Request, res: Response) {
        try{
            const id = parseInt(req.params.id)
            if (isNaN(id) || id <= 0) {
                return res.status(400).json({ success: false, message: 'Erro ao buscar chamado' })
            }
            const resultado = await this.respostaService.buscarChamado(id)
            if (!resultado.success) {
                return res.status(400).json(resultado)
            }
            return res.status(200).json(resultado)
        }
        catch (error) {
            console.error(`Erro ao buscar chamado: ${error}`)
            return res.status(500).json({ success: false, message: `Erro interno no servidor`})
        }
    }
    public async buscarMensagens(req: Request, res: Response) {
        try{
            const id = parseInt(req.params.id)
            if (isNaN(id) || id <= 0) {
                return res.status(400).json({ success: false, message: 'Erro ao buscar mensagem' })
            }
            const resultado = await this.respostaService.buscarMensagens(id)
            if (!resultado.success) {
                return res.status(400).json(resultado)
            }
            return res.status(200).json(resultado)
            
        }
        catch (error) {
            console.error(`Erro ao buscar mensagem: ${error}`)
            return res.status(500).json({ success: false, message: `Erro interno no servidor`})
        }
    }
}