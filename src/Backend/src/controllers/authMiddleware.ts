import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken';

export const invalidToken =[]
export function insertInvalidToken(token:string){
    invalidToken.push(token)
}
console.log(invalidToken)
export class AuthMiddleware {
    static authTokenCliente(req: Request, res: Response, next: NextFunction){
        const authHeader = req.headers['authorization'];
        const token =  authHeader && authHeader.split(' ')[1];
        const secret = process.env.SECRET;

        if(!token){
            return res.status(401).json({ success: false, message: `Token de autenticação não fornecido`});
        }

        if(!secret){
            return res.status(500).json({ success: false, message: `Erro interno do servidor`});
        }

        try {
            if (invalidToken.includes(token)) {
                return res.status(403).json({ success: false, message: `Token Inválido` });
            }
            jwt.verify(token, secret, (err: any, decoded: any) => {
                if (err){
                    console.log(token)
                    return res.status(403).json({success: false, message: `Token Inválido`});
                }
                next();
            });
        } catch (error) {
            console.error('Erro ao verificar token:', error);
            return res.status(500).json({ success: false, message: `Erro interno do servidor`});
        }
    }

    static authTokenAdmin(req: Request, res: Response, next: NextFunction){
        const authHeader = req.headers['authorization'];
        const token =  authHeader && authHeader.split(' ')[1];
        const secret3 = process.env.SECRET03;

        if(!token){
            return res.status(401).json({ success: false, message: `Token de autenticação não fornecido`});
        }

        if(!secret3){
            return res.status(500).json({ success: false, message: `Erro interno do servidor`});
        }

        try {
            console.log(invalidToken)
            if (invalidToken.includes(token)) {
                return res.status(403).json({ success: false, message: `Token Inválido` });
            }
            jwt.verify(token, secret3, (err: any, decoded: any) => {
                if (err){
                    return res.status(403).json({success: false, message: `Token Inválido`});
                }
                next();
            });
        } catch (error) {
            console.error('Erro ao verificar token:', error);
            return res.status(500).json({ success: false, message: `Erro interno do servidor`});
        }}

        static authTokenAtendente(req: Request, res: Response, next: NextFunction){
            const authHeader = req.headers['authorization'];
            const token =  authHeader && authHeader.split(' ')[1];
            const secret2 = process.env.SECRET02;
    
            if(!token){
                return res.status(401).json({ success: false, message: `Token de autenticação não fornecido`});
            }
    
            if(!secret2){
                return res.status(500).json({ success: false, message: `Erro interno do servidor`});
            }
    
            try {
                if (invalidToken.includes(token)) {
                    return res.status(403).json({ success: false, message: `Token Inválido` });
                }
                jwt.verify(token, secret2, (err: any, decoded: any) => {
                    if (err){
                        return res.status(403).json({success: false, message: `Token Inválido`});
                    }
                    const isAdmin = decoded.func_is_admin;
                    if (isAdmin){
                        return res.status(403).json({success: false, message: `Acesso Inválido`});
                    }
                    next();
                });
            } catch (error) {
                console.error('Erro ao verificar token:', error);
                return res.status(500).json({ success: false, message: `Erro interno do servidor`});
            }}

        static authTokenAdminOrAtendente(req: Request, res: Response, next: NextFunction){
                const authHeader = req.headers['authorization'];
                const token =  authHeader && authHeader.split(' ')[1];
                const secret2 = process.env.SECRET02
                const secret3 = process.env.SECRET03
        
                if(!token){
                    return res.status(401).json({ success: false, message: `Token de autenticação não fornecido`});
                }
        
                if(!secret2 || !secret3){
                    return res.status(500).json({ success: false, message: `Erro interno do servidor`});
                }
        
                try {
                    console.log(invalidToken)
                    if (invalidToken.includes(token)) {
                        return res.status(403).json({ success: false, message: `Token Inválido` });
                    }
                    jwt.verify(token, secret2 , (err: any, decoded: any) => {
                        if (err){
                            console.log(token)
                            jwt.verify(token, secret3, (err: any, decoded: any) => {
                                if (err) {
                                    return res.status(403).json({ success: false, message: `Token Inválido` });
                                }
                                next(); // Chama o próximo middleware se o token for válido com o secret3
                            });
                        } else {
                            next(); // Chama o próximo middleware se o token for válido com o secret2
                        }
                    });
                } catch (error) {
                    console.error('Erro ao verificar token:', error);
                    return res.status(500).json({ success: false, message: `Erro interno do servidor`});
                }}
    
    }
