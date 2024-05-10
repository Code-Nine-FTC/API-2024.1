import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken';
import { Connection } from "../config/data-source";
import Cliente from "../entities/cliente";
import Funcionario from "../entities/funcionario";

type JwtPayload = {
    id: number;
    nivelAcesso: string;
}

export class AuthMiddleware {
    static async authTokenCliente(req: Request, res: Response, next: NextFunction) {
        try {
            const authHeader = req.headers['authorization'];
            const token = authHeader && authHeader.split(' ')[1];
            const secret = process.env.SECRET;

            if (!token) {
                return res.status(401).json({ success: false, message: `Token de autenticação não fornecido` });
            }

            if (!secret) {
                return res.status(500).json({ success: false, message: `Erro interno do servidor` });
            }

            const { id, nivelAcesso } = jwt.verify(token, secret) as JwtPayload;
            const cliente = await Connection.getRepository(Cliente).findOne({ where: { cli_id: id } });

            if (!cliente) {
                return res.status(403).json({ success: false, message: `Não Autorizado` });
            }
            
            // Armazena o ID do cliente nos locais da resposta
            res.locals.userId = id;
            next();
        } catch (error) {
            console.error('Erro ao verificar token:', error);
            res.status(500).json({ success: false, message: `Erro interno do servidor` });
        }
    }

    static async authTokenAdmin(req: Request, res: Response, next: NextFunction) {
        try {
            const authHeader = req.headers['authorization'];
            const token = authHeader && authHeader.split(' ')[1];
            const secret3 = process.env.SECRET03;

            if (!token) {
                return res.status(401).json({ success: false, message: `Token de autenticação não fornecido` });
            }

            if (!secret3) {
                return res.status(500).json({ success: false, message: `Erro interno do servidor` });
            }

            const { id, nivelAcesso } = jwt.verify(token, secret3) as JwtPayload;
            const admin = await Connection.getRepository(Funcionario).findOne({ where: { func_id: id } });

            if (!admin) {
                return res.status(403).json({ success: false, message: `Token Inválido` });
            }
            res.locals.userId = id;
            next();
        } catch (error) {
            console.error('Erro ao verificar token:', error);
            res.status(500).json({ success: false, message: `Erro interno do servidor` });
        }
    }

    static async authTokenAtendente(req: Request, res: Response, next: NextFunction) {
        try {
            const authHeader = req.headers['authorization'];
            const token = authHeader && authHeader.split(' ')[1];
            const secret2 = process.env.SECRET02; // Corrigido de SECRET03 para SECRET02

            if (!token) {
                return res.status(401).json({ success: false, message: `Token de autenticação não fornecido` });
            }

            if (!secret2) {
                return res.status(500).json({ success: false, message: `Erro interno do servidor` });
            }

            const { id, nivelAcesso } = jwt.verify(token, secret2) as JwtPayload;
            const atendente = await Connection.getRepository(Funcionario).findOne({ where: { func_id: id } });

            if (!atendente) {
                return res.status(403).json({ success: false, message: `Token Inválido` });
            }
            res.locals.userId = id;
            next();
        } catch (error) {
            console.error('Erro ao verificar token:', error);
            res.status(500).json({ success: false, message: `Erro interno do servidor` });
        }
    }

    static async authTokenAdminOrAtendente(req: Request, res: Response, next: NextFunction) {
        try {
            const authHeader = req.headers['authorization']
            const token = authHeader && authHeader.split(' ')[1]
            const secret2 = process.env.SECRET02
            const secret3 = process.env.SECRET03

            if (!token) {
                res.status(401).json({ success: false, message: `Token de autenticação não fornecido` })
            }

            if (!secret2 || !secret3) {
                res.status(500).json({ success: false, message: `Erro interno do servidor` })
            }

            jwt.verify(token, secret2, async (err: any, decoded: any) => {
                if (err) {
                    jwt.verify(token, secret3, async (err: any, decoded: any) => {
                        if (err) {
                           return res.status(403).json({ success: false, message: `Token Inválido` })
                        }
                        const funcionario = await Connection.getRepository(Funcionario).findOne({ where: { func_id: decoded.id } })
                        if (!funcionario) {
                            return  res.status(403).json({ success: false, message: `Não Autorizado` })
                        }
                        res.locals.userId = decoded.id;
                        next()
                    }) as JwtPayload
                } else {
                    const funcionario = await Connection.getRepository(Funcionario).findOne({ where: { func_id: decoded.id } })
                    if (!funcionario) {
                        return  res.status(403).json({ success: false, message: `Não Autorizado` })
    
                    }
                    res.locals.userId = decoded.id;
                    next()
                }
            }) as JwtPayload
        } catch (error) {
            console.error('Erro ao verificar token:', error)
            res.status(500).json({ success: false, message: `Erro interno do servidor` })
            return null
        }
    }
}
