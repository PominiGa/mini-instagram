import { Request, Response } from "express";
import postService from "../service/postService";

class PostController {

    getPosts(req: Request, res: Response) {
        const posts = postService.obterPosts();
        return res.json(posts);
    }

    getPostById(req: Request, res: Response) {
        const { id } = req.params;
        const post = postService.obterPostPorId(Number(id));

        if (!post) {
            return res.status(404).json({ mensagem: "Post não encontrado" });
        }

        return res.json(post);
    }

    createPost(req: Request, res: Response) {
        const { usuarioId, imagem } = req.body;

        if (!usuarioId || !imagem) {
            return res.status(400).json({ mensagem: "Dados inválidos" });
        }

        const novoPost = postService.criarPost(
            { id: usuarioId } as any,
            imagem
        );

        return res.status(201).json(novoPost);
    }

    likePost(req: Request, res: Response) {
        const { id } = req.params;
        const { userId } = req.body;

        const post = postService.curtirPost(Number(userId), Number(id));

        if (!post) {
            return res.status(404).json({ mensagem: "Post não encontrado" });
        }

        return res.json(post);
    }

    unlikePost(req: Request, res: Response) {
        const { id } = req.params;
        const { userId } = req.body;

        const post = postService.descurtirPost(Number(userId), Number(id));

        if (!post) {
            return res.status(404).json({ mensagem: "Post não encontrado" });
        }

        return res.json(post);
    }

    deletePost(req: Request, res: Response) {
        const { id } = req.params;

        const deleted = postService.deletarPost(Number(id));

        if (!deleted) {
            return res.status(404).json({ mensagem: "Post não encontrado" });
        }

        return res.json({ mensagem: "Post deletado com sucesso" });
    }

    commentPost(req: Request, res: Response) {
        const { id } = req.params;
        const { userId, texto } = req.body;

        if (!texto) {
            return res.status(400).json({ mensagem: "Comentário vazio" });
        }

        const post = postService.comentarPost(
            Number(userId),
            Number(id),
            texto
        );

        if (!post) {
            return res.status(404).json({ mensagem: "Post não encontrado" });
        }

        return res.json(post);
    }
}

export default new PostController();