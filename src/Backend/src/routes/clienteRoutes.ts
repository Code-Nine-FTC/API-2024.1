import { Router } from "express";
import ClienteController from "../controllers/clienteController";
import { AuthMiddleware } from "../controllers/authMiddleware";

const router = Router()
const clienteController = new ClienteController()
const authClient = AuthMiddleware.authTokenCliente

// Rotas sem autenticação
router.post('/cadastro/cliente', clienteController.cadastrarCliente.bind(clienteController))
router.post('/login/cliente', clienteController.loginCliente.bind(clienteController))
// Rotas com autenticação
router.put('/update/cliente', authClient, clienteController.editarCliente.bind(clienteController))
router.get('/ver/cliente', authClient, clienteController.visualizarCliente.bind(clienteController))
router.put('/desativar/cliente', authClient, clienteController.desativarCliente.bind(clienteController)) 

export default router