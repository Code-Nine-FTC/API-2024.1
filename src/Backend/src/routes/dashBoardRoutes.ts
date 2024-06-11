import { Router } from 'express';
import ChamadoController from "../controllers/chamadoController";

const router = Router();
const chamadoController = new ChamadoController();

// Rotas de contagem
router.get('/chamados-por-categoria-e-status/:cat_id', chamadoController.contarChamadosPorCategoriaEStatus.bind(chamadoController));

export default router;


