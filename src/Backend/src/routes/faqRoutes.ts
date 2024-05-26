import { Router } from "express";
import { FaqController } from "../controllers/faqController";
import { AuthMiddleware } from "../controllers/authMiddleware";

const Faqrouter = Router();
const faqController = new FaqController();
const authAdmin = AuthMiddleware.authTokenAdmin;
const authAll = AuthMiddleware.authTokenAll;

Faqrouter.post('/criarFaq', authAdmin, faqController.criarFaq.bind(faqController));
Faqrouter.get('/listarFaqs', authAll, faqController.listarFaqs.bind(faqController));
Faqrouter.put('/editarFaq/:faq_id', authAdmin, faqController.editarFaq.bind(faqController));

export default Faqrouter;
