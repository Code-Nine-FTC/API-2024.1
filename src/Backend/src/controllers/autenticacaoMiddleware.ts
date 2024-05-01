import { error } from "console";
import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken';

export class Autenticacao {
    static autenticacaoToken(req: Request, res: Response, next: NextFunction){
        const authHeader = req.headers['authorization'];
        const token =  authHeader && authHeader.split(' ')[1];
        const secret = process.env.SECRET;
        console.log(secret)
        console.log(token)

        if(!token){
            return res.status(401).json({ success: false, message: `Token de autenticação não fornecido`});
        }

        if(!secret){
            return res.status(500).json({ success: false, message: `Erro interno do servidor`});
        }

        try {
            jwt.verify(token, secret, (err: any, decoded: any) => {
                if (err){
                    return res.status(403).json({success: false, message: `Token Inválido`});
                }
                next();
            });
        } catch (error) {
            console.error('Erro ao verificar token:', error);
            return res.status(500).json({ success: false, message: `Erro interno do servidor`});
        }
    }
}
