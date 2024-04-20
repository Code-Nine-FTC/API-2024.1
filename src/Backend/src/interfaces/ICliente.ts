export interface IClienteView{
    cli_email: string
    cli_nome: string
    cli_cpf: string
    cli_senha: string
}
export interface IClienteInput{
    cli_email: string
    cli_nome: string
    cli_cpf: string
    cli_senha: string
}

export interface IClienteLoggin{
    cli_email: string
    cli_senha: string
}

export interface IClienteUpdate{
    cli_email?: string
    cli_nome?: string
    cli_cpf?: string
    cli_senha?: string
}