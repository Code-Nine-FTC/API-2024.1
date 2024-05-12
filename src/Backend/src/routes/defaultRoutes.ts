import { Router } from "express";
import RespostaController from "../controllers/respostaController";
import { AuthMiddleware } from "../controllers/authMiddleware";
const router = Router()
const respostaController = new RespostaController()
const authAll = AuthMiddleware.authTokenAll

router.post('/enviarMensagem', authAll, respostaController.enviarMensagem.bind(respostaController))
router.post('/buscarChamado', authAll, respostaController.buscarChamado.bind(respostaController))
router.post('/buscarMensagens', authAll, respostaController.buscarMensagens.bind(respostaController))

export default router