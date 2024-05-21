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
            if (!resultado.success) {
                return res.status(400).json(resultado);
            }
            return res.status(201).json(resultado);
        } catch (error) {
            return res.status(400).send({ message: 'Erro ao criar FAQ: ' + error.message });
        }
    }
    
    public async listarFaqs(req: Request, res: Response) {
        try {
            const faqs = await this.faqService.listarFaqs();
            return res.status(200).send(faqs);
        } catch (error) {
            return res.status(400).send({ message: 'Erro ao listar FAQs: ' + error.message });
        }
    }
    
    public async editarFaq(req: Request, res: Response) {
        try {
            const faqId = req.params.faq_id; // Corrigido para faq_id
            const dadosUpdate: IFaqUpdate = req.body;
            const resultado = await this.faqService.editarFaq(parseInt(faqId), dadosUpdate);
            if (!resultado.success) {
                return res.status(400).json(resultado);
            }
            return res.status(200).send({ message: 'FAQ atualizada com sucesso.' });
        } catch (error) {
            return res.status(400).send({ message: 'Erro ao atualizar FAQ: ' + error.message });
        }
    }
}
