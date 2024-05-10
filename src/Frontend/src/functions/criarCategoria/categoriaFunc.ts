import {ICategoriaInput} from "../../../../Backend/src/interfaces/ICategoria"

function CriarCategoria (Titulo: string, Horario: string, Prioridade: number): ICategoriaInput{
    return {
        cat_titulo: Titulo,
        cat_horario: Horario,
        cat_prioridade: Prioridade
    };

}

export {CriarCategoria};