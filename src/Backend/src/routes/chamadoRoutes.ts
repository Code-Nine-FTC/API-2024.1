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
router.get('/chamadosAtivosCli', authClient, chamadoController.viewChamadosAtivosCliente.bind(chamadoController))
router.get('/chamadosFinalizadosCli', authClient, chamadoController.viewChamadosFinalizadosCliente.bind(chamadoController))
router.get('/todosChamadosCli', authClient, chamadoController.viewTodosChamadosCliente.bind(chamadoController))
router.get('/ultimoChamado', authClient, chamadoController.viewUltimoChamadoCliente.bind(chamadoController))

// Rotas atendenteChamado
router.get('/chamadoEmAtendimentoAtend', authAtendente, chamadoController.viewChamadoEmAtendimentoAtendente.bind(chamadoController))
router.get('/chamadosConcluidosAtend', authAtendente, chamadoController.viewChamadosFinalizadosAtendente.bind(chamadoController))
router.get('/iniciarChamado/:cha_id', authAtendente, chamadoController.iniciarAtendimentoController.bind(chamadoController))
router.get('/finalizaAtendimento/:cha_id', authAtendente, chamadoController.finalizarAtendimentoController.bind(chamadoController))
router.get('/ultimoChamadoSup', authAtendente, chamadoController.viewUltimoChamadoAtendente.bind(chamadoController))

// Para Administrador 
router.get('/todosChamadosEmAtendimentoAdm', authAdmin, chamadoController.viewTodosChamadosEmAtendimento.bind(chamadoController))
router.get('/todosChamados/administrador', authAdmin, chamadoController.viewTodosChamados.bind(chamadoController))
router.get('/direcionaAtendimento', authAdmin, chamadoController.direcionaChamadoController.bind(chamadoController))
router.get('/listaFuncionarioDisponiveis', authAdmin, chamadoController.listaFuncionarioDisponiveis.bind(chamadoController))

// Para Ambos(Administrador e Atendente)
router.get('/chamadosEmEspera', authAdminOrAtendete, chamadoController.viewChamadosEmEspera.bind(chamadoController))

export default router