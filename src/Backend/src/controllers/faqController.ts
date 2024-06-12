import { Request, Response } from 'express';
import { IFaqInput, IFaqUpdate } from '../interfaces/IFaq';
import { FaqService } from '../services/faqService';

export class FaqController {
    private faqService: FaqService;

    constructor() {
        this.faqService = new FaqService();
    }

    public async criarFaq(req: Request, res: Response) {
        try {
            const dadosFaq: IFaqInput = req.body;
            const resultado = await this.faqService.criarFaq(dadosFaq);
            const status = resultado.success ? 201 : 400;
            return res.status(status).json(resultado);
        } catch (error) {
            return res.status(400).send({ message: 'Erro ao criar FAQ: ' + error.message });
        }
    }

    public async listarFaqs(req: Request, res: Response) {
        try {
            const resultado = await this.faqService.listarFaqs();
            return res.status(resultado.success ? 200 : 400).json(resultado);
        } catch (error) {
            return res.status(400).send({ message: 'Erro ao listar FAQs: ' + error.message });
        }
    }

    public async editarFaq(req: Request, res: Response) {
        try {
            const faqId = parseInt(req.params.id, 10);
            const dadosUpdate: IFaqUpdate = req.body;
            const resultado = await this.faqService.editarFaq(faqId, dadosUpdate);
            const status = resultado.success ? 200 : 400;
            return res.status(status).json(resultado);
        } catch (error) {
            return res.status(400).send({ message: 'Erro ao atualizar FAQ: ' + error.message });
        }
    }

    public async deletarFaq(req: Request, res: Response) {
        try {
            const faqId = parseInt(req.params.id, 10);
            const resultado = await this.faqService.deletarFaq(faqId);
            const status = resultado.success ? 200 : 400;
            return res.status(status).json(resultado);
        } catch (error) {
            return res.status(400).send({ message: 'Erro ao deletar FAQ: ' + error.message });
        }
    }

    public async verFaq(req: Request, res: Response) {
        try {
            const faqId = parseInt(req.params.id, 10);
            const resultado = await this.faqService.verFaq(faqId);
            const status = resultado.success ? 200 : 400;
            return res.status(status).json(resultado);
        } catch (error) {
            return res.status(400).send({ message: 'Erro ao ver FAQ: ' + error.message });
        }
    }
}
