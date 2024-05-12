import { ICategoriaInput, ICategoriaUpdate } from "../interfaces/ICategoria";
import { IFuncionarioInput} from "../interfaces/IFuncionario";
import { Connection } from "../config/data-source";
import Categoria from "../entities/categoria";

export class CategoriaService {
    private categoriaRepository = Connection.getRepository(Categoria);

    public async criarCategoria(funcionario: IFuncionarioInput, categoriaInput: ICategoriaInput): Promise<void> {
        if (funcionario.func_is_admin) {
            categoriaInput.cat_prioridade = this.definirPrioridade(Number(categoriaInput.cat_horario));
            await this.categoriaRepository.save(categoriaInput);
        } else {
            throw new Error("Somente administradores podem criar categorias.");
        }
    }

    public async listarCategorias(): Promise<ICategoriaInput[]> {
        return await this.categoriaRepository.find();
    }

    public async editarCategoria(funcionario: IFuncionarioInput, cat_id: number, categoriaUpdate: ICategoriaUpdate): Promise<void> {
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
            return 'alta';
        } else if (horario <= 3) {
            return 'média';
        } else if (horario <= 5) {
            return 'baixa';
        } else {
            return 'baixa';
        }
    }
}


