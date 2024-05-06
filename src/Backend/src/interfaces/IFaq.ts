export interface IFaqView {
    faq_data_modificacao: Date
    faq_exemplo: string
    faq_titulo: string
    faq_descricao: string
}

export interface IFaqInput {
    faq_exemplo: string
    faq_titulo: string
    faq_descricao: string
}

export interface IFaqUpdate {
    faq_exemplo?: string
    faq_titulo?: string
    faq_descricao?: string
}