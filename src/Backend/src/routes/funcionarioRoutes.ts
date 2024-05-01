import { Router } from "express";
import FuncionarioController from "../controllers/funcionarioController";
import { AuthMiddleware } from "../controllers/authMiddleware";

const router = Router()
const funcionarioController = new FuncionarioController()
const authAdmin =  AuthMiddleware.authTokenAdmin
const authAdminOrAtendente =AuthMiddleware.authTokenAdminOrAtendente

router.post('/cadastroFuncionario', authAdmin,funcionarioController.cadastrarFuncionario.bind(funcionarioController))
router.put('/updateFuncionario/:id', authAdmin, funcionarioController.editarFuncionario.bind(funcionarioController))
router.get('/viewFuncionario/:id', authAdminOrAtendente, funcionarioController.visualizarFuncionario.bind(funcionarioController))
router.post('/logginFuncionario', funcionarioController.logginFuncionario.bind(funcionarioController))
router.get('/logoutFuncionario', funcionarioController.logoutFuncionario.bind(funcionarioController))
router.get('/desativarFuncionario/:id', authAdmin,funcionarioController.desativarFuncionario.bind(funcionarioController))
router.get('/visualizarTodosFuncionarios', authAdmin,funcionarioController.visualizarTodosFuncionarios.bind(funcionarioController))

export default router


