import { Router } from "express";
import ClienteController from "../controllers/clienteController";
import { Autenticacao } from "../controllers/autenticacaoMiddleware";

const router = Router();
const clienteController = new ClienteController();
const autenticacao = Autenticacao.autenticacaoToken;

router.post('/cadastroCliente', clienteController.cadastrarCliente.bind(clienteController));
router.post('/logginCliente', clienteController.logginCliente.bind(clienteController));
router.put('/updateCliente/:id', autenticacao, clienteController.editarCliente.bind(clienteController));
router.get('/viewCliente/:id', autenticacao, clienteController.visualizarCliente.bind(clienteController));
router.get('/desativarCliente/:id', autenticacao, clienteController.desativarCliente.bind(clienteController)); 

export default router;