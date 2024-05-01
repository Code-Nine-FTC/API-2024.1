import { Router } from "express";
import FuncionarioController from "../controllers/funcionarioController";
import { AuthMiddleware } from "../controllers/authMiddleware";

const router = Router()
const funcionarioController = new FuncionarioController()
const authAdmin =  AuthMiddleware.authTokenAdmin
const authAdminOrAtendente =AuthMiddleware.authTokenAdminOrAtendente

// Rotas sem Autenticação
router.post('/cadastroFuncionario', authAdmin,funcionarioController.cadastrarFuncionario.bind(funcionarioController))
router.post('/logginFuncionario', funcionarioController.logginFuncionario.bind(funcionarioController))
// Rotas com autenticação
router.put('/updateFuncionario', authAdmin, funcionarioController.editarFuncionario.bind(funcionarioController))
router.post('/viewFuncionario', authAdminOrAtendente, funcionarioController.visualizarFuncionario.bind(funcionarioController))
router.get('/logoutFuncionario', authAdminOrAtendente,funcionarioController.logoutFuncionario.bind(funcionarioController))
router.get('/desativarFuncionario', authAdmin,funcionarioController.desativarFuncionario.bind(funcionarioController))
router.get('/visualizarTodosFuncionarios', authAdmin,funcionarioController.visualizarTodosFuncionarios.bind(funcionarioController))

export default router


