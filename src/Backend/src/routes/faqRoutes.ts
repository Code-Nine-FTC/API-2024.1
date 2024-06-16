import { Router } from "express";
import { FaqController } from "../controllers/faqController";
import { AuthMiddleware } from "../controllers/authMiddleware";

const Faqrouter = Router();
const faqController = new FaqController();
const authAdmin = AuthMiddleware.authTokenAdmin;
const authAll = AuthMiddleware.authTokenAll;

Faqrouter.post('/criar/faq', authAdmin, faqController.criarFaq.bind(faqController));
Faqrouter.get('/todos/faqs', authAll, faqController.listarFaqs.bind(faqController));
Faqrouter.get('/ver/faq/:id', authAdmin, faqController.verFaq.bind(faqController))
Faqrouter.put('/editar/faq/:id', authAdmin, faqController.editarFaq.bind(faqController));
Faqrouter.delete('/deletar/faq/:id', authAdmin, faqController.deletarFaq.bind(faqController))

export default Faqrouter;
