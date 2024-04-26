import Chamado from "../entities/chamado";

export interface IFuncionarioView {
    func_nome: string
    func_cpf: string
    func_email: string
    func_telefone: number
    func_senha: string
    func_expediente_inicio: string
    func_expediente_final: string
    ativo: boolean
}

export interface IFuncionarioInput {
    func_nome: string
    func_cpf: string
    func_email: string
    func_telefone: number
    func_senha: string
    func_expediente_inicio: string
    func_expediente_final: string
    func_is_admin: boolean
}

export interface IFuncionarioLoggin{
    func_cpf: string
    func_senha: string
}

export interface IFuncionarioUpdate{
    func_nome?: string
    func_cpf?: string
    func_email?: string
    func_telefone?: number
    func_senha?: string
    func_expediente_inicio?: string
    func_expediente_final?: string
    ativo?: boolean
}