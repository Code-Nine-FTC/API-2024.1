import Chamado from "../entities/chamado"

export interface IRespostaInput {
    texto: string
    autoria: boolean
    data: Date
    chamado: Chamado
}