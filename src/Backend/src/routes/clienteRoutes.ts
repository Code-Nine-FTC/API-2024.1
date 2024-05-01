import { Router } from "express";
import ClienteController from "../controllers/clienteController";
import { AuthMiddleware } from "../controllers/authMiddleware";

const router = Router();
const clienteController = new ClienteController();
const authClient = AuthMiddleware.authTokenCliente;

router.post('/cadastroCliente', clienteController.cadastrarCliente.bind(clienteController));
router.post('/logginCliente', clienteController.logginCliente.bind(clienteController));
router.get('/logoutCliente',authClient, clienteController.logoutCliente.bind(clienteController));
router.put('/updateCliente', authClient, clienteController.editarCliente.bind(clienteController));
router.get('/viewCliente', authClient, clienteController.visualizarCliente.bind(clienteController));
router.get('/desativarCliente', authClient, clienteController.desativarCliente.bind(clienteController)); 

export default router;