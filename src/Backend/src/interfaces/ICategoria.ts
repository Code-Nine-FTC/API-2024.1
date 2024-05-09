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