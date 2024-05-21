import { IFaqInput, IFaqUpdate } from "../interfaces/IFaq";
import { Connection } from "../config/data-source";
import Faq from "../entities/faq";

export class FaqService {
    private faqRepository = Connection.getRepository(Faq);

    public async criarFaq(dadosFaq: IFaqInput) {
        try {
            const novaFaq = await this.faqRepository.create(dadosFaq)
            await this.faqRepository.save(novaFaq)
            return { success: true, message: `Nova FAQ adicionada com sucesso!`, faq: novaFaq }

        } catch (error) {
            console.error(`Erro ao cadastrar FAQ: ${error}`)
            return { success: false, message: `Erro ao cadastrar FAQ.` }
        }
    }

    public async listarFaqs() {
        try {
            const faqs = await this.faqRepository.find();
            if (faqs.length === 0) {
                return { success: false, message: 'Nenhuma FAQ encontrada' };
            }
            return { success: true, message: `FAQs encontradas`, faqs };
        } catch (error) {
            console.error(`Erro ao listar FAQs: ${error}`);
            return { success: false, message: 'Erro ao listar FAQs' };
        }
    }

    public async editarFaq(faqId: number, faqUpdate: IFaqUpdate) {
        try {
            const faq = await this.faqRepository.findOne({ where: { faq_id: faqId } });
            if (!faq) {
                return { success: false, message: `FAQ não encontrada` }
            }

            const faqUpdateFinal = { ...faq, ...faqUpdate }
            await this.faqRepository.update(faqId, faqUpdateFinal)
            return { success: true, message: `FAQ atualizada com sucesso`, faqUpdateFinal }
        } catch (error) {
            console.error(`Erro ao editar FAQ: ${error}`)
            return { success: false, message: `Erro ao editar FAQ` }
        }
    }
}
