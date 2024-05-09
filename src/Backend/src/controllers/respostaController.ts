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
}