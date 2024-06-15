import { Router } from "express";
import ChamadoController from "../controllers/chamadoController";
import { AuthMiddleware } from "../controllers/authMiddleware";

const router = Router()
const chamadoController = new ChamadoController()
const authClient = AuthMiddleware.authTokenCliente
const authAdmin = AuthMiddleware.authTokenAdmin
const authAtendente = AuthMiddleware.authTokenAtendente
const authAdminOrAtendente = AuthMiddleware.authTokenAdminOrAtendente

//Rotas clienteChamado
router.post('/novo/chamado',authClient, chamadoController.cadastrarChamado.bind(chamadoController))
router.get('/chamados/ativos/cliente', authClient, chamadoController.viewChamadosAtivosCliente.bind(chamadoController))
router.get('/chamadosFinalizadosCli', authClient, chamadoController.viewChamadosFinalizadosCliente.bind(chamadoController))
router.get('/todos/chamados/cliente', authClient, chamadoController.viewTodosChamadosCliente.bind(chamadoController))
router.get('/ultimo/chamado/cliente', authClient, chamadoController.viewUltimoChamadoCliente.bind(chamadoController))

// Rotas atendenteChamado
router.get('/chamado/em/atendimento/funcionario', authAtendente, chamadoController.viewChamadoEmAtendimentoAtendente.bind(chamadoController))
router.get('/todos/chamados/finalizados', authAtendente, chamadoController.viewChamadosFinalizadosAtendente.bind(chamadoController))
router.put('/iniciar/chamado/:cha_id', authAtendente, chamadoController.iniciarAtendimentoController.bind(chamadoController))
router.put('/finaliza/atendimento/:cha_id', authAtendente, chamadoController.finalizarAtendimentoController.bind(chamadoController))
router.get('/ultimo/chamado/atendente', authAtendente, chamadoController.viewUltimoChamadoAtendente.bind(chamadoController))

// Para Administrador 
router.get('/todos/chamados/em/atendimento', authAdmin, chamadoController.viewTodosChamadosEmAtendimento.bind(chamadoController))
router.get('/todos/chamados/administrador', authAdmin, chamadoController.viewTodosChamados.bind(chamadoController))
router.put('/direciona/atendimento', authAdmin, chamadoController.direcionaChamadoController.bind(chamadoController))
router.get('/todos/funcionarios/disponiveis', authAdmin, chamadoController.listaFuncionarioDisponiveis.bind(chamadoController))
router.post('/dashboard/pesquisa/chamado/status/:cat_id', authAdmin, chamadoController.dashboardPesquisaChamado.bind(chamadoController))
router.post('/dashboard/pesquisa/todos-chamados', authAdmin, chamadoController.dashboardPesquisaTodosChamados.bind(chamadoController));

// Para Ambos(Administrador e Atendente)
router.get('/todos/chamados/em/espera', authAdminOrAtendente, chamadoController.viewChamadosEmEspera.bind(chamadoController))

export default router