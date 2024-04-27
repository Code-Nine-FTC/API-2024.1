import { Router } from "express";
import FuncionarioController from "../controllers/funcionarioController";

const router = Router()
const funcionarioController = new FuncionarioController()

router.post('/cadastroFuncionario', funcionarioController.cadastrarFuncionario.bind(funcionarioController))
router.put('/updateFuncionario/:id', funcionarioController.editarFuncionario.bind(funcionarioController))
router.get('/viewFuncionario/:id', funcionarioController.visualizarFuncionario.bind(funcionarioController))
router.post('/logginFuncionario', funcionarioController.logginFuncionario.bind(funcionarioController))
router.get('/desativarFuncionario/:id', funcionarioController.desativarFuncionario.bind(funcionarioController))

export default router


