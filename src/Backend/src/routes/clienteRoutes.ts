import { Router } from "express";
import ClienteController from "../controllers/clienteController";
import { AuthMiddleware } from "../controllers/authMiddleware";

const router = Router();
const clienteController = new ClienteController();
const autenticacao = AuthMiddleware.authTokenCliente;

router.post('/cadastroCliente', clienteController.cadastrarCliente.bind(clienteController));
router.post('/logginCliente', clienteController.logginCliente.bind(clienteController));
router.post('/logoutCliente', clienteController.logoutCliente.bind(clienteController));
router.put('/updateCliente/:id', autenticacao, clienteController.editarCliente.bind(clienteController));
router.get('/viewCliente/:id', autenticacao, clienteController.visualizarCliente.bind(clienteController));
router.get('/desativarCliente/:id', autenticacao, clienteController.desativarCliente.bind(clienteController)); 

export default router;