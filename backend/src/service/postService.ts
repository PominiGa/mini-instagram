import Post from "../entity/post";
import Comment from "../entity/comment";
import notificationService from "./notificationService";

class PostService {
    private posts: Post[] = [];
    private nextId: number = 1;

    criarPost(usuarioId: number, imagem: string): Post {
        const novoPost: Post = {
            id: this.nextId++,
            usuarioId,
            imagem,
            likes: [],
            comentarios: [],
            criadoEm: new Date(),
        };

        this.posts.push(novoPost);
        return novoPost;
    }

    obterPosts(): Post[] {
        return this.posts;
    }

    obterPostPorId(postId: number): Post | null {
        return this.posts.find((p) => p.id === postId) || null;
    }

    curtirPost(userId: number, postId: number): Post | null {
        const post = this.obterPostPorId(postId);
        if (!post) return null;

        if (!post.likes.includes(userId)) {
            post.likes.push(userId);

            if (userId !== post.usuarioId) {
                notificationService.criarNotificacao(
                    post.usuarioId,
                    "like",
                    "Seu post recebeu uma curtida"
                );
            }
        }

        return post;
    }

    descurtirPost(userId: number, postId: number): Post | null {
        const post = this.obterPostPorId(postId);
        if (!post) return null;

        post.likes = post.likes.filter((id) => id !== userId);
        return post;
    }

    comentarPost(userId: number, postId: number, texto: string): Post | null {
        const post = this.obterPostPorId(postId);
        if (!post) return null;

        if (!texto || texto.trim() === "") return null;

        const novoComentario: Comment = {
            usuarioId: userId,
            texto,
            data: new Date(),
        };

        post.comentarios.push(novoComentario);

        if (userId !== post.usuarioId) {
            notificationService.criarNotificacao(
                post.usuarioId,
                "comment",
                "Comentaram no seu post"
            );
        }

        return post;
    }

    deletarPost(postId: number): boolean {
        const index = this.posts.findIndex((p) => p.id === postId);

        if (index !== -1) {
            this.posts.splice(index, 1);
            return true;
        }

        return false;
    }
}

export default new PostService();