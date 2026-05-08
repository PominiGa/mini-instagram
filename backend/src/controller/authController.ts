import { Request, Response } from "express";
import authService from "../service/authService";

class AuthController {

    async register(req: Request, res: Response) {
        const { nome, email, senha } = req.body;

        if (!nome || !email || !senha) {
            return res.status(400).json({ mensagem: "Dados inválidos" });
        }

        const user = await authService.register(nome, email, senha);

        if (!user) {
            return res.status(400).json({ mensagem: "Email já cadastrado" });
        }

        return res.status(201).json(user);
    }

    async login(req: Request, res: Response) {
        const { email, senha } = req.body;

        const token = await authService.login(email, senha);

        if (!token) {
            return res.status(401).json({ mensagem: "Credenciais inválidas" });
        }

        return res.json({ token });
    }
}

export default new AuthController();