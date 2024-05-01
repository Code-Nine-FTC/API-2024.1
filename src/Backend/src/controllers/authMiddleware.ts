import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken';
import { Connection } from "../config/data-source";
import Cliente from "../entities/cliente";
import Funcionario from "../entities/funcionario";

export const invalidToken = []
export function insertInvalidToken(token: string) {
    invalidToken.push(token)
}
type JwtPayload = {
    id: number
}
console.log(invalidToken)
export class AuthMiddleware {
    static async authTokenCliente(req: Request, res: Response, next: NextFunction) {
        try {
            const authHeader = req.headers['authorization']
            const user = await Connection.getRepository(Cliente)
            const token = authHeader && authHeader.split(' ')[1]
            const secret = process.env.SECRET

            if (!token) {
                return res.status(401).json({ success: false, message: `Token de autenticação não fornecido` })
            }

            if (!secret) {
                return res.status(500).json({ success: false, message: `Erro interno do servidor` })
            }

            if (invalidToken.includes(token)) {
                return res.status(403).json({ success: false, message: `Token Inválido` })
            }

            const clienteTocken = jwt.verify(token, secret) as JwtPayload
            console.log(clienteTocken)

            const cliente = await user.findOne({ where: { cli_id: clienteTocken.id } })

            if (!cliente) {
                return res.status(403).json({ success: false, message: `Não Autorizado` })
            }

            const { cli_senha: _, ...clienteLogado } = cliente
            res.locals.cliente = clienteLogado
            next()
        } catch (error) {
            console.error('Erro ao verificar token:', error)
            return res.status(500).json({ success: false, message: `Erro interno do servidor` })
        }
    }

    static async authTokenAdmin(req: Request, res: Response, next: NextFunction) {
        try {
            const authHeader = req.headers['authorization']
            const token = authHeader && authHeader.split(' ')[1]
            const secret3 = process.env.SECRET03

            if (!token) {
                return res.status(401).json({ success: false, message: `Token de autenticação não fornecido` })
            }

            if (!secret3) {
                return res.status(500).json({ success: false, message: `Erro interno do servidor` })
            }

            if (invalidToken.includes(token)) {
                return res.status(403).json({ success: false, message: `Token Inválido` })
            }
            const admToken = jwt.verify(token, secret3) as JwtPayload
            const admin = await Connection.getMongoRepository(Funcionario).findOne({ where: { func_id: admToken.id } })

            if (!admin) {
                return res.status(403).json({ success: false, message: `Token Inválido` })
            }
            const { func_senha: _, ...funcionarioLogado } = admin
            res.locals.funcionario = funcionarioLogado
            next()
        } catch (error) {
            console.error('Erro ao verificar token:', error)
            return res.status(500).json({ success: false, message: `Erro interno do servidor` })
        }
    }

    static async authTokenAtendente(req: Request, res: Response, next: NextFunction) {
        try {
            const authHeader = req.headers['authorization']
            const token = authHeader && authHeader.split(' ')[1]
            const secret3 = process.env.SECRET03

            if (!token) {
                return res.status(401).json({ success: false, message: `Token de autenticação não fornecido` })
            }

            if (!secret3) {
                return res.status(500).json({ success: false, message: `Erro interno do servidor` })
            }

            if (invalidToken.includes(token)) {
                return res.status(403).json({ success: false, message: `Token Inválido` })
            }
            const atendenteToken = jwt.verify(token, secret3) as JwtPayload
            const atendente = await Connection.getMongoRepository(Funcionario).findOne({ where: { func_id: atendenteToken.id } })

            if (!atendente) {
                return res.status(403).json({ success: false, message: `Token Inválido` })
            }
            const { func_senha: _, ...funcionarioLogado } = atendente
            res.locals.funcionario = funcionarioLogado
            next()
        } catch (error) {
            console.error('Erro ao verificar token:', error)
            return res.status(500).json({ success: false, message: `Erro interno do servidor` })
        }
    }

    static async authTokenAdminOrAtendente(req: Request, res: Response, next: NextFunction) {
        try {
            const authHeader = req.headers['authorization']
            const token = authHeader && authHeader.split(' ')[1]
            const secret2 = process.env.SECRET02
            const secret3 = process.env.SECRET03

            if (!token) {
                return res.status(401).json({ success: false, message: `Token de autenticação não fornecido` })
            }

            if (!secret2 || !secret3) {
                return res.status(500).json({ success: false, message: `Erro interno do servidor` })
            }

            if (invalidToken.includes(token)) {
                return res.status(403).json({ success: false, message: `Token Inválido` })
            }
            jwt.verify(token, secret2, async (err: any, decoded: any) => {
                if (err) {
                    jwt.verify(token, secret3, async (err: any, decoded: any) => {
                        if (err) {
                            return res.status(403).json({ success: false, message: `Token Inválido` })
                        }

                        const funcionario = await Connection.getRepository(Funcionario).findOne({ where: { func_id: decoded.id } })
                        if (!funcionario) {
                            return res.status(403).json({ success: false, message: `Não Autorizado` })
                        }
                        res.locals.funcionario = funcionario
                        next()
                    }) as JwtPayload
                } else {
                    const funcionario = await Connection.getRepository(Funcionario).findOne({ where: { func_id: decoded.id } })
                    if (!funcionario) {
                        return res.status(403).json({ success: false, message: `Não Autorizado` })
                    }
                    res.locals.funcionario = funcionario
                    next()
                }
            }) as JwtPayload
        } catch (error) {
            console.error('Erro ao verificar token:', error)
            return res.status(500).json({ success: false, message: `Erro interno do servidor` })
        }
    }

}
