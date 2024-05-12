import { Router } from "express";
import RespostaController from "../controllers/respostaController";

const router = Router()
const respostaController = new RespostaController()

router.post('/enviarMensagem', respostaController.enviarMensagem.bind(respostaController))
router.post('/buscarChamado', respostaController.buscarChamado.bind(respostaController))
router.post('/buscarMensagens', respostaController.buscarMensagens.bind(respostaController))

export default router