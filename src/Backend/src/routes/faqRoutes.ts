import { Router } from "express";
import { FaqController } from "../controllers/faqController";
import { AuthMiddleware } from "../controllers/authMiddleware";

const router = Router();
const faqController = new FaqController();
const authAdmin = AuthMiddleware.authTokenAdmin;
const authAll = AuthMiddleware.authTokenAll;

router.post('/criarFaq', authAdmin, faqController.criarFaq.bind(faqController));
router.get('/listarFaqs', authAll, faqController.listarFaqs.bind(faqController));
router.put('/editarFaq/:faq_id', authAdmin, faqController.editarFaq.bind(faqController));

export default router;
