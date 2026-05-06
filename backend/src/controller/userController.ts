import { Request, Response } from "express";
import userService from "../service/userService";

class UserController {

    getUsers(req: Request, res: Response) {
        return res.json(userService.obterUsers());
    }

    getUserById(req: Request, res: Response) {
        const user = userService.obterUserPorId(Number(req.params.id));

        if (!user) {
            return res.status(404).json({ mensagem: "Usuário não encontrado" });
        }

        return res.json(user);
    }

    createUser(req: Request, res: Response) {
        const { nome, email, senha } = req.body;

        if (!nome) {
            return res.status(400).json({ mensagem: "Nome é obrigatório" });
        }

        const user = userService.criarUser(nome, email, senha);

        return res.status(201).json(user);
    }

    deleteUser(req: Request, res: Response) {
        const deleted = userService.deletarUser(Number(req.params.id));

        if (!deleted) {
            return res.status(404).json({ mensagem: "Usuário não encontrado" });
        }

        return res.json({ mensagem: "Usuário deletado" });
    }

    followUser(req: Request, res: Response) {
        const { id } = req.params;
        const { userId } = req.body;

        const success = userService.seguirUsuario(Number(userId), Number(id));

        if (!success) {
            return res.status(400).json({ mensagem: "Não foi possível seguir" });
        }

        return res.json({ mensagem: "Agora você está seguindo esse usuário" });
    }

    unfollowUser(req: Request, res: Response) {
        const { id } = req.params;
        const { userId } = req.body;

        const success = userService.deixarDeSeguir(Number(userId), Number(id));

        if (!success) {
            return res.status(400).json({ mensagem: "Não foi possível deixar de seguir" });
        }

        return res.json({ mensagem: "Você deixou de seguir esse usuário" });
    }
}

export default new UserController();