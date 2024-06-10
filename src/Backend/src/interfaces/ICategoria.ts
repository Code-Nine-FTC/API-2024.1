

export interface ICategoriaInput {
    cat_titulo: string
    cat_horario: string
    cat_prioridade: string
}

export interface ICategoriaUpdate {
    cat_titulo?: string
    cat_horario?: string
    cat_prioridade?: string
}
export interface ICategoriaView {
    campo1: ReactNode
    campo2: ReactNode
    prioridade: ReactNode
    valor: ReactNode
    nome: ReactNode
    cat_titulo: string
    cat_horario: string
    cat_prioridade: string
    cat_id: string
}