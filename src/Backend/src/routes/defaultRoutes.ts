import { Router } from "express";
import { FrontpageAuth } from "../controllers/frontPagesAuth";
import RespostaController from "../controllers/respostaController";

const router = Router()
const frontpageAuth = new FrontpageAuth()
const respostaController = new RespostaController()

router.post('enviarmensagem', respostaController.enviarMensagem.bind(respostaController))
router.post('/autenticarfrontpage', frontpageAuth.validarPagina.bind(frontpageAuth))

export default router