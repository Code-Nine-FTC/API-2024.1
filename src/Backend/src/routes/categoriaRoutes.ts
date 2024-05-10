import { Router } from 'express';
import { CategoriaController } from '../controllers/categoriaController';

const router = Router();
const categoriaController = new CategoriaController();

router.post('/categoria', categoriaController.criarCategoria);
router.get('/categorias', categoriaController.listarCategorias);
router.put('/categoria/:cat_titulo', categoriaController.editarCategoria);

export default router;
