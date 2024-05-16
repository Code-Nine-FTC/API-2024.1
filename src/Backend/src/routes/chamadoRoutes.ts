import { Router } from "express";
import ChamadoController from "../controllers/chamadoController";
import { AuthMiddleware } from "../controllers/authMiddleware";

const router = Router()
const chamadoController = new ChamadoController()
const authClient = AuthMiddleware.authTokenCliente
const authAdmin = AuthMiddleware.authTokenAdmin
const authAtendente = AuthMiddleware.authTokenAtendente
const authAdminOrAtendete = AuthMiddleware.authTokenAdminOrAtendente

//Rotas clienteChamado
router.post('/cadastroChamado',authClient, chamadoController.cadastrarChamado.bind(chamadoController))
router.get('/chamadosAtivos', authClient, chamadoController.viewChamadosAtivosCliente.bind(chamadoController))
router.get('/chamadosFinalizados', authClient, chamadoController.viewChamadosFinalizadosCliente.bind(chamadoController))
router.get('/todosChamados', authClient, chamadoController.viewTodosChamadosCliente.bind(chamadoController))
router.get('/ultimoChamado', authClient, chamadoController.viewUltimoChamadoCliente.bind(chamadoController))

// Rotas atendenteChamado
router.get('/chamadoEmAtendimento', authAtendente, chamadoController.viewChamadoEmAtendimentoAtendente.bind(chamadoController))
router.get('/chamadosConcluidos', authAtendente, chamadoController.viewChamadosFinalizadosAtendente.bind(chamadoController))
router.get('/iniciarChamado/:cha_id', authAtendente, chamadoController.iniciarAtendimentoController.bind(chamadoController))
router.get('/finalizaAtendimento/:cha_id', authAtendente, chamadoController.finalizarAtendimentoController.bind(chamadoController))

// Para Administrador 
router.get('/todosChamadosEmAtendimento', authAdmin, chamadoController.viewTodosChamadosEmAtendimento.bind(chamadoController))
router.get('/todosChamados/administrador', authAdmin, chamadoController.viewTodosChamados.bind(chamadoController))
router.get('/direcionaAtendimento', authAdmin, chamadoController.direcionaChamadoController.bind(chamadoController))

// Para Ambos(Administrador e Atendente)
router.get('/chamadosEmEspera', authAdminOrAtendete, chamadoController.viewChamadosEmEspera.bind(chamadoController))

export default router