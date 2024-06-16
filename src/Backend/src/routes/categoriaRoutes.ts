import { Router } from "express";
import { CategoriaController } from "../controllers/categoriaController";
import { AuthMiddleware } from "../controllers/authMiddleware";

const router = Router();
const categoriaController = new CategoriaController();
const authAdmin = AuthMiddleware.authTokenAdmin;
const authAll = AuthMiddleware.authTokenAll;


router.post('/criar/categoria',authAdmin, categoriaController.criarCategoria.bind(categoriaController));
router.get('/todas/categorias', authAll,categoriaController.listarCategorias.bind(categoriaController));
router.put('/editar/categoria/:cat_id', authAdmin, categoriaController.editarCategoria.bind(categoriaController));

export default router;

