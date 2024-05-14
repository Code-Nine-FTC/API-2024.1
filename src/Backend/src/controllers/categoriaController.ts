import { Request, Response } from 'express';
import { ICategoriaInput, ICategoriaUpdate } from "../interfaces/ICategoria";
import { IFuncionarioInput } from "../interfaces/IFuncionario";
import { CategoriaService } from '../services/categoriaService';

export class CategoriaController {
    private categoriaService: CategoriaService;
    constructor() {
        this.categoriaService = new CategoriaService();
    }
   
    public async criarCategoria(req: Request, res: Response) {
        try {
            const dadosCategoria: ICategoriaInput = req.body;
            await this.categoriaService.criarCategoria(dadosCategoria);
            return res.status(201).send({ message: 'Categoria criada com sucesso.' });
        } catch (error) {
            return res.status(400).send({ message: 'Erro ao criar categoria: ' + error.message });
        }
    }
    
    public async listarCategorias(req: Request, res: Response) {
        try {
            const categorias = await this.categoriaService.listarCategorias();
            return res.status(200).send(categorias);
        } catch (error) {
            return res.status(400).send({ message: 'Erro ao listar categorias: ' + error.message });
        }
    }
    
    public async editarCategoria(req: Request, res: Response) {
        try {
            const cat_id: number = Number(req.params.cat_id);
            const dadosUpdate: ICategoriaUpdate = req.body;
            await this.categoriaService.editarCategoria(cat_id, dadosUpdate);
            return res.status(200).send({ message: 'Categoria atualizada com sucesso.' });
        } catch (error) {
            return res.status(400).send({ message: 'Erro ao atualizar categoria: ' + error.message });
        }
    }
}