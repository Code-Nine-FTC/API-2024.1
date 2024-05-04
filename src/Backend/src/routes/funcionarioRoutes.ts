import { Router } from "express";
import FuncionarioController from "../controllers/funcionarioController";
import { AuthMiddleware } from "../controllers/authMiddleware";

const router = Router()
const funcionarioController = new FuncionarioController()
const authAdmin =  AuthMiddleware.authTokenAdmin
const authAdminOrAtendente =AuthMiddleware.authTokenAdminOrAtendente

// Rota sem Autenticação
router.post('/logginFuncionario', funcionarioController.logginFuncionario.bind(funcionarioController))
// Rotas com autenticação
router.post('/cadastroFuncionario', authAdmin,funcionarioController.cadastrarFuncionario.bind(funcionarioController))
router.put('/updateFuncionario',  funcionarioController.editarFuncionario.bind(funcionarioController))
router.post('/viewFuncionario',  funcionarioController.visualizarFuncionario.bind(funcionarioController))
router.get('/desativarFuncionario', authAdmin,funcionarioController.desativarFuncionario.bind(funcionarioController))
router.get('/visualizarTodosFuncionarios', funcionarioController.visualizarTodosFuncionarios.bind(funcionarioController))

export default router


