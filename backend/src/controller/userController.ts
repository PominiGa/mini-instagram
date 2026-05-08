import { Request, Response } from "express";
import userService from "../service/userService";
import { AuthRequest } from "../Middleware/authMiddleware";

class UserController {

    getUsers(req: AuthRequest, res: Response) {
        return res.json(userService.obterUsers());
    }

    getUserById(req: AuthRequest, res: Response) {
        const user = userService.obterUserPorId(Number(req.params.id));

        if (!user) {
            return res.status(404).json({ mensagem: "Usuário não encontrado" });
        }

        return res.json(user);
    }

    deleteUser(req: AuthRequest, res: Response) {
        const userId = req.userId;
        const { id } = req.params;

        if (Number(id) !== userId) {
            return res.status(403).json({ mensagem: "Sem permissão" });
        }

        const deleted = userService.deletarUser(Number(id));

        if (!deleted) {
            return res.status(404).json({ mensagem: "Usuário não encontrado" });
        }

        return res.json({ mensagem: "Usuário deletado" });
    }

    followUser(req: AuthRequest, res: Response) {
        const userId = req.userId;
        const { id } = req.params;

        const success = userService.seguirUsuario(userId!, Number(id));

        if (!success) {
            return res.status(400).json({ mensagem: "Erro ao seguir" });
        }

        return res.json({ mensagem: "Seguindo usuário" });
    }

    unfollowUser(req: AuthRequest, res: Response) {
        const userId = req.userId;
        const { id } = req.params;

        const success = userService.deixarDeSeguir(userId!, Number(id));

        if (!success) {
            return res.status(400).json({ mensagem: "Erro ao deixar de seguir" });
        }

        return res.json({ mensagem: "Deixou de seguir" });
    }
}

export default new UserController();