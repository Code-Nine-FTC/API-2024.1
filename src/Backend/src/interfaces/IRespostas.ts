import Chamado from "../entities/chamado"

export interface IRespostaInput {
    texto: string
    autoria: boolean
    data: string
    chamado: Chamado
}
export interface IRespostaSelect{
    resp_id: number
    texto: string
    autoria: boolean
    data: string
    chamado: Chamado
}