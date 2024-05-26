import { Router } from "express";
import FuncionarioController from "../controllers/funcionarioController";
import {  AuthMiddleware } from "../controllers/authMiddleware";

const router = Router()
const funcionarioController = new FuncionarioController()
const authAdmin =  AuthMiddleware.authTokenAdmin
const authAdminOrAtendente = AuthMiddleware.authTokenAdminOrAtendente

// Rota sem Autenticação
router.post('/logginFuncionario', funcionarioController.logginFuncionario.bind(funcionarioController))
// Rotas com autenticação
router.post('/cadastroFuncionario', authAdmin,funcionarioController.cadastrarFuncionario.bind(funcionarioController))
router.put('/updateFuncionario',  authAdmin, funcionarioController.editarFuncionario.bind(funcionarioController))
router.post('/viewFuncionario',  authAdmin, funcionarioController.visualizarFuncionario.bind(funcionarioController))
router.post('/desativarFuncionario', authAdmin,funcionarioController.desativarFuncionario.bind(funcionarioController))
router.get('/visualizarTodosFuncionarios', authAdmin, funcionarioController.visualizarTodosFuncionarios.bind(funcionarioController))
router.get('/viewPerfilFuncionario',  authAdminOrAtendente, funcionarioController.visualizarPerfilFuncionario.bind(funcionarioController))
export default router


