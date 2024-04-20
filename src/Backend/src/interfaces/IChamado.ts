import Cliente from "../entities/cliente";
import Funcionario from "../entities/funcionario";
import Resposta from "../entities/resposta";

export interface IChamadoView{
    cha_titulo: string
    cha_descricao: string
    cha_prioridade: string
    cha_status: string
    cha_data_final?: Date
    cha_data_inicio: Date
    cha_topico_chamado: string
    cliente: Cliente
    funcionario?: Funcionario
    resposta: Resposta[]
}
export interface IChamadoInput {
    cha_titulo: string;
    cha_descricao: string;
    cha_topico_chamado: string;
    cha_data_inicio: Date
    cliente: Cliente;
    funcionario?: Funcionario;
}
export interface IChamadoUpdate {
    cha_prioridade?: string
    cha_status: string
}