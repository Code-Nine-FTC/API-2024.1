import { Router } from "express";
import { CategoriaController } from "../controllers/categoriaController";
import { AuthMiddleware } from "../controllers/authMiddleware";

const router = Router();
const categoriaController = new CategoriaController();
const authAdmin = AuthMiddleware.authTokenAdmin;

router.post('/categoria', authAdmin, categoriaController.criarCategoria);
router.get('/categorias', authAdmin, categoriaController.listarCategorias);
router.put('/categoria/:cat_id', authAdmin, categoriaController.editarCategoria);

export default router;

