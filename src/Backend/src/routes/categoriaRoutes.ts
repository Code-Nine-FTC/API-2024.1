import { Router } from 'express';
import { CategoriaController } from '../controllers/categoriaController';

const router = Router();
const categoriaController = new CategoriaController();
// importar da authMiddleware a autenticação
// adicionar authAdmin em cada rota
router.post('/categoria', categoriaController.criarCategoria); // colocar melhorar nova da rota para indicar o que em qual rota esta
router.get('/categorias', categoriaController.listarCategorias);
router.put('/categoria/:cat_titulo', categoriaController.editarCategoria); // cat_id 

export default router;
