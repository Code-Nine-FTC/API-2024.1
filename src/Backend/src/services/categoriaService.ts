import { ICategoriaInput, ICategoriaUpdate } from "../interfaces/ICategoria";
import { IFuncionarioInput} from "../interfaces/IFuncionario";
import { Connection } from "../config/data-source";
import Categoria from "../entities/categoria";

export class CategoriaService {
    private categoriaRepository = Connection.getRepository(Categoria);

    public async criarCategoria(dadosCategoria: ICategoriaInput){
        try{
            // Cria a nova categoria
            const novaCategoria = await this.categoriaRepository.create(dadosCategoria)
            // Salva a nova categoria
            await this.categoriaRepository.save(dadosCategoria)
            return { success: true, message: `Nova Categoria adicionada com sucesso!`, categoria: novaCategoria}

        }catch(error){
            console.error(`Erro ao cadastrar categoria: ${error}`)
            return { success: false, message: `Erro ao cadastrar categoria.` }
        }
    }

    public async listarCategorias() {
        return await this.categoriaRepository.find(); // fazer tratamento de erros como criar Categoria
    }

    // Remover funcionario(autenticação já verifica se é adm)
    // deixar (cat_id: number, dadosCategoria:ICategoriaUpdate)
    // usar logica de editarCliente 
    // Tratamento de erros!!!
    public async editarCategoria(funcionario: IFuncionarioInput, cat_id: number, categoriaUpdate: ICategoriaUpdate){
        if (funcionario.func_is_admin) {
            const categoria = await this.categoriaRepository.findOne({ where: { cat_id } });
            if (categoria) {
                if (categoriaUpdate.cat_titulo !== undefined) {
                    categoria.cat_titulo = categoriaUpdate.cat_titulo;
                }
                if (categoriaUpdate.cat_horario !== undefined) {
                    categoria.cat_horario = categoriaUpdate.cat_horario;
                    categoria.cat_prioridade = this.definirPrioridade(Number(categoriaUpdate.cat_horario));
                }
                await this.categoriaRepository.save(categoria);
            } else {
                throw new Error("Categoria não encontrada.");
            }
        } else {
            throw new Error("Somente administradores podem editar categorias.");
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


