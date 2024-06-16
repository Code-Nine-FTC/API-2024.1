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

router.post('/enviar/mensagem', authAll, respostaController.enviarMensagem.bind(respostaController))
router.get('/buscar/chamado/:id', authAll, respostaController.buscarChamado.bind(respostaController))
router.get('/buscar/mensagens/:id', authAll, respostaController.buscarMensagens.bind(respostaController))
router.get('/chat/funcionario/:id',  authAll, funcionarioController.visualizarFuncionario.bind(funcionarioController))
router.get('/chat/cliente', authAll, clienteController.visualizarCliente.bind(clienteController))


export default router