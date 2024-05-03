import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken';
import { Connection } from "../config/data-source";
import Cliente from "../entities/cliente";
import Funcionario from "../entities/funcionario";

type JwtPayload = {
    id: number
    nivelAcesso: string;
}

export class AuthMiddleware {
    static async authTokenCliente(req: Request, res: Response, next: NextFunction): Promise<JwtPayload | null> {
        try {
            const authHeader = req.headers['authorization']
            const user = await Connection.getRepository(Cliente)
            const token = authHeader && authHeader.split(' ')[1]
            const secret = process.env.SECRET

            if (!token) {
                res.status(401).json({ success: false, message: `Token de autenticação não fornecido` })
                return null
            }

            if (!secret) {
                res.status(500).json({ success: false, message: `Erro interno do servidor` })
                return null
            }

            const clienteToken = jwt.verify(token, secret) as JwtPayload
            console.log(clienteToken)

            const cliente = await user.findOne({ where: { cli_id: clienteToken.id } })

            if (!cliente) {
                res.status(403).json({ success: false, message: `Não Autorizado` })
                return null
            }

            // return res.status(200).json({
            //     success: true,
            //     id: clienteTocken.id,
            //     nivelAcesso: clienteTocken.nivelAcesso
            
            next()
            return clienteToken
            
        } catch (error: any) {
            console.error('Erro ao verificar token:', error)
            res.status(500).json({ success: false, message: `Erro interno do servidor` })
            return null
        }  
        }

    static async authTokenAdmin(req: Request, res: Response, next: NextFunction): Promise<JwtPayload | null> {
        try {
            const authHeader = req.headers['authorization'];
            const token = authHeader && authHeader.split(' ')[1];
            const secret3 = process.env.SECRET03;

            if (!token) {
                res.status(401).json({ success: false, message: `Token de autenticação não fornecido` });
                return null
            }

            if (!secret3) {
                res.status(500).json({ success: false, message: `Erro interno do servidor` });
                return null;
            }

            const admToken = jwt.verify(token, secret3) as JwtPayload;
            console.log(admToken)

            const admin = await Connection.getRepository(Funcionario).findOne({ where: { func_id: admToken.id } });

            if (!admin) {
                res.status(403).json({ success: false, message: `Token Inválido` });
                return null 
            }
            // const { func_senha: _, ...funcionarioLogado } = admin;
            // res.locals.funcionario = funcionarioLogado;

            next()
            return admToken
        } catch (error) {
            console.error('Erro ao verificar token:', error);
            res.status(500).json({ success: false, message: `Erro interno do servidor` });
            null
        }
    }

    static async authTokenAtendente(req: Request, res: Response, next: NextFunction): Promise<JwtPayload | null> {
        try {
            const authHeader = req.headers['authorization']
            const token = authHeader && authHeader.split(' ')[1]
            const secret3 = process.env.SECRET03

            if (!token) {
                res.status(401).json({ success: false, message: `Token de autenticação não fornecido` })
                return null;
            }

            if (!secret3) {
                res.status(500).json({ success: false, message: `Erro interno do servidor` })
                return null
            }

            const atendenteToken = jwt.verify(token, secret3) as JwtPayload
            const atendente = await Connection.getRepository(Funcionario).findOne({ where: { func_id: atendenteToken.id } })

            if (!atendente) {
                res.status(403).json({ success: false, message: `Token Inválido` })
                return null
            }
            // const { func_senha: _, ...funcionarioLogado } = atendente
            // res.locals.funcionario = funcionarioLogado
            next()
            return atendenteToken

        } catch (error) {
            console.error('Erro ao verificar token:', error)
            res.status(500).json({ success: false, message: `Erro interno do servidor` })
            return null
        }
    }

    static async authTokenAdminOrAtendente(req: Request, res: Response, next: NextFunction): Promise<JwtPayload | null> {
        try {
            const authHeader = req.headers['authorization']
            const token = authHeader && authHeader.split(' ')[1]
            const secret2 = process.env.SECRET02
            const secret3 = process.env.SECRET03

            if (!token) {
                res.status(401).json({ success: false, message: `Token de autenticação não fornecido` })
                return null
            }

            if (!secret2 || !secret3) {
                res.status(500).json({ success: false, message: `Erro interno do servidor` })
                return null
            }

            jwt.verify(token, secret2, async (err: any, decoded: any) => {
                if (err) {
                    jwt.verify(token, secret3, async (err: any, decoded: any) => {
                        if (err) {
                            res.status(403).json({ success: false, message: `Token Inválido` })
                            return null
                        }
                        const funcionario = await Connection.getRepository(Funcionario).findOne({ where: { func_id: decoded.id } })
                        if (!funcionario) {
                            res.status(403).json({ success: false, message: `Não Autorizado` })
                            return null
                        }
                        next()
                        return decoded
                    }) as JwtPayload
                } else {
                    const funcionario = await Connection.getRepository(Funcionario).findOne({ where: { func_id: decoded.id } })
                    if (!funcionario) {
                        res.status(403).json({ success: false, message: `Não Autorizado` })
                        return null
                    }
                    next()
                    return decoded
                }
            }) as JwtPayload
        } catch (error) {
            console.error('Erro ao verificar token:', error)
            res.status(500).json({ success: false, message: `Erro interno do servidor` })
            return null
        }
    }

}
