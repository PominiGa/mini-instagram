import { Response } from "express";
import { AuthRequest } from "../Middleware/authMiddleware";
import postService from "../service/postService";

class PostController {

    getPosts(req: AuthRequest, res: Response) {
        return res.json(postService.obterPosts());
    }

    getPostById(req: AuthRequest, res: Response) {
        const post = postService.obterPostPorId(Number(req.params.id));

        if (!post) {
            return res.status(404).json({ mensagem: "Post não encontrado" });
        }

        return res.json(post);
    }

    createPost(req: AuthRequest, res: Response) {
        const { imagem } = req.body;
        const userId = req.userId;

        if (!userId || !imagem) {
            return res.status(400).json({ mensagem: "Dados inválidos" });
        }

        const post = postService.criarPost(userId, imagem);

        return res.status(201).json(post);
    }

    likePost(req: AuthRequest, res: Response) {
        const { id } = req.params;
        const userId = req.userId;

        const post = postService.curtirPost(Number(userId), Number(id));

        if (!post) {
            return res.status(404).json({ mensagem: "Post não encontrado" });
        }

        return res.json(post);
    }

    unlikePost(req: AuthRequest, res: Response) {
        const { id } = req.params;
        const userId = req.userId;

        const post = postService.descurtirPost(Number(userId), Number(id));

        if (!post) {
            return res.status(404).json({ mensagem: "Post não encontrado" });
        }

        return res.json(post);
    }

    commentPost(req: AuthRequest, res: Response) {
        const { texto } = req.body;
        const { id } = req.params;
        const userId = req.userId;

        const post = postService.comentarPost(
            Number(userId),
            Number(id),
            texto
        );

        if (!post) {
            return res.status(400).json({ mensagem: "Erro ao comentar" });
        }

        return res.json(post);
    }

    deletePost(req: AuthRequest, res: Response) {
        const { id } = req.params;
        const userId = req.userId;

        const post = postService.obterPostPorId(Number(id));

        if (!post) {
            return res.status(404).json({ mensagem: "Post não encontrado" });
        }

        if (post.usuarioId !== userId) {
            return res.status(403).json({ mensagem: "Sem permissão" });
        }

        postService.deletarPost(Number(id));

        return res.json({ mensagem: "Post deletado" });
    }
}

export default new PostController();