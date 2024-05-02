import { Request, Response, NextFunction } from "express";
import { AuthMiddleware } from "../controllers/authMiddleware";

type JwtPayload = {
    id: number;
    nivelAcesso: string;
}

export class FrontpageAuth {
    private authMethods = [
        AuthMiddleware.authTokenAdmin,
        AuthMiddleware.authTokenCliente,
        AuthMiddleware.authTokenAtendente,
        AuthMiddleware.authTokenAdminOrAtendente,
    ];

    public async validarPagina(req: Request, res: Response, next: NextFunction){
            try {
                const token = req.headers['authorization']?.split(' ')[1];
                if (!token) {
                    return res.status(401).json({ success: false, message: `Token de autenticação não fornecido` });
                }
                let decodedToken: JwtPayload | null = null
                for (const authMethod of this.authMethods) {
                    decodedToken = await authMethod(req, res, next);
                    if (decodedToken) {
                        return res.status(200).json(decodedToken);
                    }
                }
            } catch (error) {
                console.error('Erro ao verificar token:', error);
                return res.status(500).json({ success: false, message: `Erro interno do servidor` });
            }
        } 
    } 
