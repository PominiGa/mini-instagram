import { Request, Response, NextFunction } from "express";
import authService from "../service/authService";

export interface AuthRequest extends Request {
    userId?: number;
}

export function authMiddleware(req: AuthRequest, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ mensagem: "Token não fornecido" });
    }

    const [, token] = authHeader.split(" ");

    const decoded = authService.verifyToken(token);

    if (!decoded) {
        return res.status(401).json({ mensagem: "Token inválido" });
    }

    req.userId = decoded.id;

    next();
}