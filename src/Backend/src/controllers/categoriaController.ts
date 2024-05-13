import { Request, Response } from 'express';
import { ICategoriaInput, ICategoriaUpdate } from "../interfaces/ICategoria";
import { IFuncionarioInput } from "../interfaces/IFuncionario";
import { CategoriaService } from '../services/categoriaService';

export class CategoriaController {
    private categoriaService = new CategoriaService();
    // usar metodo construtor ex  funcionarioController 

    public async criarCategoria(req: Request, res: Response) {
        try {
            const funcionario: IFuncionarioInput = req.body.funcionario; // remover
            const categoriaInput: ICategoriaInput = req.body // mudar nome de variavel para dadosCategoria
            await this.categoriaService.criarCategoria(funcionario, categoriaInput); // recebe o apenas dadosCategoria
            return res.status(201).send({ message: 'Categoria criada com sucesso.' }); // tratamento de erro ex: FuncionarioController
        } catch (error) {
            return res.status(400).send({ message: error.message });
        }
    }

    public async listarCategorias(req: Request, res: Response) {
        try {
            const categorias = await this.categoriaService.listarCategorias(); // tratamento de erro
            return res.status(200).send(categorias);
        } catch (error) {
            return res.status(400).send({ message: error.message });
        }
    }

    public async editarCategoria(req: Request, res: Response) { // cat_id pega dos params
        //dadosUpdate = req.body
        try {
            const funcionario: IFuncionarioInput = req.body.funcionario;
            const cat_titulo: string = req.params.cat_titulo;
            const categoriaUpdate: ICategoriaUpdate = req.body.categoria;
            await this.categoriaService.editarCategoria(funcionario, cat_titulo, categoriaUpdate);// passar (cat_id, dadosUpdate)
            return res.status(200).send({ message: 'Categoria atualizada com sucesso.' });//tratemento de erro
        } catch (error) {
            return res.status(400).send({ message: error.message }); // melhorar tratamento de erro
        }
    }
}


