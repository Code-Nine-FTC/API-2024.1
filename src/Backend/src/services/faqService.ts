import { IFaqInput, IFaqUpdate } from "../interfaces/IFaq";
import { Connection } from "../config/data-source";
import Faq from "../entities/faq";

export class FaqService {
    private faqRepository = Connection.getRepository(Faq);

    public async criarFaq(dadosFaq: IFaqInput) {
        try {
            // cria um novo faq
            const novaFaq = this.faqRepository.create({
                ...dadosFaq,
                faq_data_modificacao: new Date() 
            });
            // salva o faq
            await this.faqRepository.save(novaFaq);
            return { success: true, message: `Faq criado com sucesso.`, faq: novaFaq };
        } catch (error) {
            console.error(`Erro ao cadastrar FAQ: ${error}`);
            return { success: false, message: `Erro ao cadastrar FAQ.` };
        }
    }

    public async listarFaqs() {
        try {
            // busca todos os faqs existentes
            const faqs = await this.faqRepository.find();
            // verifica se possuinão é vazio
            if (faqs.length === 0) {
                return { success: false, message: 'Nenhuma FAQ registrado.' };
            }
            return { success: true, message: `FAQs encontrados`, faqs };
        } catch (error) {
            console.error(`Erro ao listar FAQs: ${error}`);
            return { success: false, message: 'Erro ao listar FAQs' };
        }
    }

    public async verFaq(id: number){
        try {
            // busca o faq
            const faq = await this.faqRepository.findOne({ where: { faq_id: id } });
            // verifica se ele existe
            if (!faq) {
                return { success: false, message: `FAQ não encontrado` };
            }
            return { success: true, message: `Faq encontrado.`, faq};
        } catch (error) {
            console.error(`Erro ao deletar FAQ: ${error}`);
            return { success: false, message: `Erro ao deletar FAQ` };
        }
    }

    public async editarFaq(faqId: number, faqUpdate: IFaqUpdate) {
        try {
            // busca o faq
            const faq = await this.faqRepository.findOne({ where: { faq_id: faqId } });
            // verifica se ele existe
            if (!faq) {
                return { success: false, message: `FAQ não encontrado` };
            }
            // mescla com informações passadas 
            const faqUpdateFinal = { ...faq, ...faqUpdate, faq_data_modificacao: new Date() };
            delete faqUpdateFinal.faq_id
            // Atualiza a data de modificação
            await this.faqRepository.update(faqId, faqUpdateFinal);
            console.log(faqUpdateFinal)
            return { success: true, message: `FAQ atualizado com sucesso`, faqUpdateFinal };
        } catch (error) {
            console.error(`Erro ao editar FAQ: ${error}`);
            return { success: false, message: `Erro ao editar FAQ` };
        }
    }

    public async deletarFaq(id: number){
        try {
            // busca o faq
            const faq = await this.faqRepository.findOne({ where: { faq_id: id } });
            // verifica se ele existe
            if (!faq) {
                return { success: false, message: `FAQ não encontrado` };
            }
            
            await this.faqRepository.delete(id)
            return { success: true, message: `Faq deletado.`};
        } catch (error) {
            console.error(`Erro ao deletar FAQ: ${error}`);
            return { success: false, message: `Erro ao deletar FAQ` };
        }
    }
}
