import { Request, Response } from 'express';
import { ICategoriaInput, ICategoriaUpdate } from "../interfaces/ICategoria";
import { IFuncionarioInput } from "../interfaces/IFuncionario";
import { CategoriaService } from '../services/categoriaService';

export class CategoriaController {
    private categoriaService = new CategoriaService();

    public async criarCategoria(req: Request, res: Response): Promise<Response> {
        try {
            const funcionario: IFuncionarioInput = req.body.funcionario;
            const categoriaInput: ICategoriaInput = req.body.categoria;
            await this.categoriaService.criarCategoria(funcionario, categoriaInput);
            return res.status(201).send({ message: 'Categoria criada com sucesso.' });
        } catch (error) {
            return res.status(400).send({ message: error.message });
        }
    }

    public async listarCategorias(req: Request, res: Response): Promise<Response> {
        try {
            const categorias = await this.categoriaService.listarCategorias();
            return res.status(200).send(categorias);
        } catch (error) {
            return res.status(400).send({ message: error.message });
        }
    }

    public async editarCategoria(req: Request, res: Response): Promise<Response> {
        try {
            const funcionario: IFuncionarioInput = req.body.funcionario;
            const cat_titulo: string = req.params.cat_titulo;
            const categoriaUpdate: ICategoriaUpdate = req.body.categoria;
            await this.categoriaService.editarCategoria(funcionario, cat_titulo, categoriaUpdate);
            return res.status(200).send({ message: 'Categoria atualizada com sucesso.' });
        } catch (error) {
            return res.status(400).send({ message: error.message });
        }
    }
}


