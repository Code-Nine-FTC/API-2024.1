import Chamado from "../entities/chamado"

export interface IResposta{
    resp_mensagem_reposta: string
    resp_feita_por_atendente: boolean
    resp_data_resposta: Date
    chamado: Chamado
}