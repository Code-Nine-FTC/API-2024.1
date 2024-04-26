import { Router } from "express";
import ClienteController from "../controllers/clienteController";

const router = Router()
const clienteController = new ClienteController()

router.post('/cadastroCliente', clienteController.cadastrarCliente.bind(clienteController))
router.post('/logginCliente', clienteController.logginCliente.bind(clienteController))
router.get('/updateCliente/:id', clienteController.editarCliente.bind(clienteController))
router.get('/viewCliente/:id', clienteController.visualizarCliente.bind(clienteController))

export default router