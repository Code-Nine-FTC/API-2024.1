import { Router } from "express";
import ClienteController from "../controllers/clienteController";

const router = Router()
const clienteController = new ClienteController()

router.post('/cadastroCliente', clienteController.cadastrarCliente.bind(clienteController))
router.post('/logginCliente', clienteController.logginCliente.bind(clienteController))
router.put('/updateCliente/:id', clienteController.editarCliente.bind(clienteController))
router.get('/viewCliente/:id', clienteController.visualizarCliente.bind(clienteController))
router.get('/desativarCliente/:id', clienteController.desativarCliente.bind(clienteController))

export default router