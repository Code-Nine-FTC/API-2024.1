import { Router } from "express";
import RespostaController from "../controllers/respostaController";
import { AuthMiddleware } from "../controllers/authMiddleware";
import FuncionarioController from "../controllers/funcionarioController";
import ClienteController from "../controllers/clienteController";
const clienteController = new ClienteController()
const funcionarioController = new FuncionarioController()
const router = Router()
const respostaController = new RespostaController()
const authAll = AuthMiddleware.authTokenAll

router.post('/enviarMensagem', authAll, respostaController.enviarMensagem.bind(respostaController))
router.post('/buscarChamado', authAll, respostaController.buscarChamado.bind(respostaController))
router.post('/buscarMensagens', authAll, respostaController.buscarMensagens.bind(respostaController))
router.post('/chatFuncionario',  authAll, funcionarioController.visualizarFuncionario.bind(funcionarioController))
router.get('/chatCliente', authAll, clienteController.visualizarCliente.bind(clienteController))


export default router