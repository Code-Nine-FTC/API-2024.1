import { ICategoriaInput, ICategoriaUpdate } from "../interfaces/ICategoria";
import { IFuncionarioInput} from "../interfaces/IFuncionario";
import { Connection } from "../config/data-source";
import Categoria from "../entities/categoria";

export class CategoriaService {
    private categoriaRepository = Connection.getRepository(Categoria);

    public async criarCategoria(dadosCategoria: ICategoriaInput){
        try{
            const categoria = await this.categoriaRepository.findOne({
                where:{ cat_titulo: dadosCategoria.cat_titulo }
            })
            if(categoria){
                return { success: false, message: `Categoria existente.`}
            }
            const novaCategoria = await this.categoriaRepository.create(dadosCategoria)
            await this.categoriaRepository.save(novaCategoria)
            return { success: true, message: `Categoria criada.`, categoria: novaCategoria}
    
        }catch(error){
            console.error(`Erro ao cadastrar categoria: ${error}`)
            return { success: false, message: `Erro ao cadastrar categoria.` }
        }
    }
    
    public async listarCategorias() {
        try {
            const categorias = await this.categoriaRepository.find();
            if (categorias.length === 0) {
                return { success: false, message: 'Nenhuma categoria encontrada' };
            }
            return { success: true, message:`Categorias encontradas`, categorias };
        } catch (error) {
            console.error(`Erro ao listar categorias: ${error}`);
            return { success: false, message: 'Erro ao listar categorias' };
        }
    }

    public async editarCategoria(cat_id: number, categoriaUpdate: ICategoriaUpdate) {
        try {
            const categoria = await this.categoriaRepository.findOne({ where: { cat_id: cat_id} })
            if (!categoria) {
                return { success: false, message: `Categoria não encontrada` }
            }
            if (categoriaUpdate.cat_titulo) {
                const tituloExistente = await this.categoriaRepository.findOne({ where: { cat_titulo: categoriaUpdate.cat_titulo } })
    
                if (tituloExistente && tituloExistente.cat_id !== cat_id) {
                    return { success: false, message: `Título já cadastrado` }
                }
            }
            if (categoriaUpdate.cat_horario) {
                categoria.cat_horario = categoriaUpdate.cat_horario;
                categoria.cat_prioridade = this.definirPrioridade(Number(categoriaUpdate.cat_horario));
            }
    
            const categoriaUpdateFinal = { ...categoria, ...categoriaUpdate }
            delete categoriaUpdateFinal.cat_id
            await this.categoriaRepository.update(cat_id, categoriaUpdateFinal)
            return { success: true, message: `Categoria atualizada com sucesso`, categoriaUpdateFinal }
        } catch (error) {
            console.error(`Erro ao editar categoria: ${error}`)
            return { success: false, message: `Erro ao editar categoria` }
        }
    }
    
    private definirPrioridade(horario: number): string {
        if (horario <= 1) {
            return 'Alta';
        } else if (horario <= 3) {
            return 'Média';
        } else if (horario <= 5) {
            return 'Baixa';
        } else {
            return 'Baixa';
        }
    }
}


