import { Router } from "express";
import FuncionarioController from "../controllers/funcionarioController";
import {  AuthMiddleware } from "../controllers/authMiddleware";

const router = Router()
const funcionarioController = new FuncionarioController()
const authAdmin =  AuthMiddleware.authTokenAdmin
const authAdminOrAtendente = AuthMiddleware.authTokenAdminOrAtendente

// Rota sem Autenticação
router.post('/login/funcionario', funcionarioController.loginFuncionario.bind(funcionarioController))
// Rotas com autenticação
router.post('/cadastro/funcionario', authAdmin,funcionarioController.cadastrarFuncionario.bind(funcionarioController))
router.put('/update/funcionario',  authAdmin, funcionarioController.editarFuncionario.bind(funcionarioController))
router.get('/ver/funcionario/:id',  authAdmin, funcionarioController.visualizarFuncionario.bind(funcionarioController))
router.put('/desativar/funcionario/:id', authAdmin,funcionarioController.desativarFuncionario.bind(funcionarioController))
router.get('/ver/todos/funcionarios', authAdmin, funcionarioController.visualizarTodosFuncionarios.bind(funcionarioController))
router.get('/ver/perfil/funcionario',  authAdminOrAtendente, funcionarioController.visualizarPerfilFuncionario.bind(funcionarioController))
export default router


