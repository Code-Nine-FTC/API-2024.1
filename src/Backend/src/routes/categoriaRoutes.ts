import { Router } from "express";
import { CategoriaController } from "../controllers/categoriaController";
import { AuthMiddleware } from "../controllers/authMiddleware";

const router = Router();
const categoriaController = new CategoriaController();
const authAdmin = AuthMiddleware.authTokenAdmin;

router.post('/criarCategoria'
, categoriaController.criarCategoria.bind(categoriaController));
router.get('/listarCategorias', authAdmin, categoriaController.listarCategorias.bind(categoriaController));
router.put('/categoria/:cat_id', authAdmin, categoriaController.editarCategoria);

export default router;

