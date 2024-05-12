import { Response, Request } from "express";
import { IRespostaInput } from "../interfaces/IRespostas";
import RespostaService from "../services/respostaService";
export default class RespostaController {
    private respostaService: RespostaService
    constructor() {
        this.respostaService = new RespostaService()
    }
    async enviarMensagem(req: Request, res: Response) {
        console.log('Received POST request to /enviarMensagem')
        console.log(req.body)
        try {
            const dadosMensagem: IRespostaInput = req.body
            console.log('Request body: ', dadosMensagem)
            const resultado = await this.respostaService.enviarMensagem(dadosMensagem)
            if (resultado.success) {
                return res.status(201).json(resultado)
            }
            else {
                return res.status(400).json(resultado)
            }
        }
        catch (error) {
            console.error(`Erro ao enviar a mensagem: ${error}`)
            return res.status(500).json({ success: false, message: `Erro interno no servidor`})
        }
    }
    async buscarChamado(req: Request, res: Response) {
        console.log('Received POST request to /buscarChamado')
        console.log(req.body)
        try{
            const chamados = req.body
            const id = Number(chamados.cha_id)
            console.log('id do chamado')
            console.log(id)
            if (isNaN(id) || id <= 0) {
                return res.status(400).json({ success: false, message: 'Erro ao buscar chamado' })
            }
            const resultado = await this.respostaService.buscarChamado(id)
            if (resultado.success) { 
                return res.status(200).json(resultado)
            } else {
                return res.status(400).json(resultado)
            }
        }
        catch (error) {
            console.error(`Erro ao buscar chamado: ${error}`)
            return res.status(500).json({ success: false, message: `Erro interno no servidor`})
        }
    }
    async buscarMensagens(req: Request, res: Response) {
        console.log('Received POST request to /buscarMensagens')
        console.log(req.body)
        try{
            const mensagem = req.body
            const id = Number(mensagem.cha_id)
            console.log('id da mensagem')
            console.log(id)
            if (isNaN(id) || id <= 0) {
                return res.status(400).json({ success: false, message: 'Erro ao buscar mensagem' })
            }
            const resultado = await this.respostaService.buscarMensagens(id)
            if (resultado.success) {
                return res.status(200).json(resultado)
            } else {
                return res.status(400).json(resultado)
            }
        }
        catch (error) {
            console.error(`Erro ao buscar mensagem: ${error}`)
            return res.status(500).json({ success: false, message: `Erro interno no servidor`})
        }
    }
}